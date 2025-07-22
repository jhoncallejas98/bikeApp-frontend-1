import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionService, Station } from '../../station.service';
import { BicicletaService, Bike } from '../../bike.service';
import { AlquilerService, Book } from '../../book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-estacion',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './detalle-estacion.html',
  styleUrl: './detalle-estacion.css'
})
export class DetalleEstacion implements OnInit {
  estacion: Station | null = null;
  bicicletas: Bike[] = [];
  loading = true;
  error = '';
  mensaje = '';
  devolucionForm: FormGroup;
  devolviendo = false;
  alquilando = false;

  constructor(
    private route: ActivatedRoute,
    private estacionService: EstacionService,
    private bicicletaService: BicicletaService,
    private alquilerService: AlquilerService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.devolucionForm = this.fb.group({
      bookId: ['']
    });
  }

  ngOnInit(): void {
    this.cargarDetalle();
  }

  cargarDetalle(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.loading = true;
      this.estacionService.getById(id).subscribe({
        next: (estacion: Station) => {
          this.estacion = estacion;
          this.loading = false;
          if (estacion._id) {
            this.cargarBicicletas(estacion._id);
          }
        },
        error: (err: any) => {
          this.error = 'Error al cargar estación';
          this.loading = false;
        }
      });
    }
  }

  cargarBicicletas(estacionId: string) {
    this.bicicletaService.getAll('disponible').subscribe({
      next: (bicis: Bike[]) => {
        this.bicicletas = bicis.filter(b => b.status === 'disponible');
      },
      error: () => {
        this.bicicletas = [];
      }
    });
  }

  alquilarBicicleta(bici: Bike) {
    if (!this.estacion || bici.status !== 'disponible') return;
    this.mensaje = '';
    this.error = '';
    this.alquilando = true;
    this.alquilerService.alquilar({
      user: 'usuario', // Aquí deberías obtener el usuario real
      bike: bici._id,
      stationSalida: this.estacion._id,
      horaInicio: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      activo: true
    }).subscribe({
      next: () => {
        this.mensaje = '¡Bicicleta alquilada con éxito!';
        this.alquilando = false;
        setTimeout(() => this.cargarDetalle(), 1200);
      },
      error: (err: any) => {
        this.mensaje = err.error?.msg || 'Error al alquilar bicicleta';
        this.alquilando = false;
      }
    });
  }

  devolverBicicleta() {
    const { bookId } = this.devolucionForm.value;
    this.mensaje = '';
    this.error = '';
    this.devolviendo = true;
    this.alquilerService.devolver({ alquilerId: bookId, stationId: this.estacion?._id }).subscribe({
      next: () => {
        this.mensaje = '¡Bicicleta devuelta con éxito!';
        this.devolviendo = false;
        this.devolucionForm.reset();
        setTimeout(() => this.cargarDetalle(), 1200);
      },
      error: (err: any) => {
        this.mensaje = err.error?.msg || 'Error al devolver bicicleta';
        this.devolviendo = false;
      }
    });
  }
}

