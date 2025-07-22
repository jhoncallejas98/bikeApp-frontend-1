import { Component, OnInit } from '@angular/core';
import { BicicletaService, Bike } from '../../bike.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bicicletas-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bicicletas-component.html',
  styleUrl: './bicicletas-component.css'
})
export class BicicletasComponent implements OnInit {
  bicicletas: Bike[] = [];
  loading = true;
  error = '';
  mensaje = '';
  creando = false;
  editando = false;
  editId: string | null = null;

  statusOptions = [
    { value: 'disponible', label: 'Disponible' },
    { value: 'en uso', label: 'En uso' },
    { value: 'en mantenimiento', label: 'En mantenimiento' }
  ];

  constructor(private bicicletaService: BicicletaService) {}

  ngOnInit(): void {
    this.cargarBicicletas();
  }

  cargarBicicletas(): void {
    this.loading = true;
    this.error = '';
    this.bicicletaService.getAll().subscribe({
      next: (data: Bike[]) => {
        this.bicicletas = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar bicicletas';
        this.loading = false;
      }
    });
  }

  trackByBici(index: number, bici: Bike): string | undefined {
    return bici._id;
  }

  agregarBicicleta(): void {
    if (this.creando) return;
    this.creando = true;
    this.mensaje = '';
    if (this.editando && this.editId) {
      this.creando = false;
    } else {
      this.creando = false;
    }
  }

  editarBicicleta(bici: Bike): void {
    this.editando = true;
    this.editId = bici._id || null;
    // No hay formulario para editar, solo se actualiza el estado
    // this.agregarForm.setValue({
    //   serial: bici.serial,
    //   status: bici.status,
    //   capacity: bici.capacity,
    //   availableBikes: bici.availableBikes
    // });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.editId = null;
    // No hay formulario para resetear, solo se actualiza el estado
    // this.agregarForm.reset({ status: 'disponible', capacity: 1, availableBikes: 0 });
  }

  eliminarBicicleta(bici: Bike): void {
    // Aquí deberías tener método delete en el servicio si lo necesitas
  }
} 