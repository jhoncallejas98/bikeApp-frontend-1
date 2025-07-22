import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstacionService, Station } from '../../station.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-componet',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-componet.html',
  styleUrl: './home-componet.css'
})
export class HomeComponet implements OnInit {
  estaciones: Station[] = [];
  loading = true;
  error = '';
  mensaje = '';
  agregarForm: FormGroup;
  creando = false;
  editando = false;
  editId: string | null = null;

  constructor(private stationService: EstacionService, private router: Router, private fb: FormBuilder) {
    this.agregarForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      capacity: [1, [Validators.required, Validators.min(1)]],
      availableBikes: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.cargarEstaciones();
  }

  cargarEstaciones(): void {
    this.loading = true;
    this.error = '';
    this.stationService.getAll().subscribe({
      next: (data: Station[]) => {
        this.estaciones = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar estaciones';
        this.loading = false;
      }
    });
  }

  agregarEstacion(): void {
    if (this.agregarForm.invalid) return;
    this.creando = true;
    this.mensaje = '';
    if (this.editando && this.editId) {
      // Aquí deberías tener métodos update y delete en el servicio si los necesitas
      this.creando = false;
    } else {
      // Aquí deberías tener método create en el servicio si lo necesitas
      this.creando = false;
    }
  }

  editarEstacion(estacion: Station): void {
    this.editando = true;
    this.editId = estacion._id || null;
    this.agregarForm.setValue({
      name: estacion.name,
      location: estacion.location,
      capacity: estacion.capacity,
      availableBikes: estacion.availableBikes
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.editId = null;
    this.agregarForm.reset({ name: '', location: '', capacity: 1, availableBikes: 0 });
  }

  eliminarEstacion(estacion: Station): void {
    // Aquí deberías tener método delete en el servicio si lo necesitas
  }

  verDetalle(estacion: Station) {
    this.router.navigate(['/detalle-estacion'], { queryParams: { id: estacion._id } });
  }
}
