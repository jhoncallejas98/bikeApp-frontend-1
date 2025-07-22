import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstacionService, Station } from '../../station.service';
import { BicicletaService, Bike } from '../../bike.service';
import { AlquilerService, Book } from '../../book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  alquilerForm: FormGroup;
  devolucionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private estacionService: EstacionService,
    private bicicletaService: BicicletaService,
    private alquilerService: AlquilerService,
    private fb: FormBuilder
  ) {
    this.alquilerForm = this.fb.group({
      user: [''],
      bikeId: ['']
    });
    this.devolucionForm = this.fb.group({
      bookId: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.estacionService.getById(id).subscribe({
        next: (estacion: Station) => {
          this.estacion = estacion;
          this.bicicletaService.getAll('disponible').subscribe({
            next: (bikes: Bike[]) => {
              this.bicicletas = bikes.filter((b: Bike) => b.status === 'disponible' && b.availableBikes > 0);
              this.loading = false;
            },
            error: (err: any) => {
              this.error = 'Error al cargar bicicletas';
              this.loading = false;
            }
          });
        },
        error: (err: any) => {
          this.error = 'Error al cargar estación';
          this.loading = false;
        }
      });
    } else {
      this.error = 'ID de estación no proporcionado';
      this.loading = false;
    }
  }

  alquilarBicicleta() {
    if (!this.estacion) return;
    const { user, bikeId } = this.alquilerForm.value;
    this.mensaje = '';
    this.alquilerService.alquilar({
      user,
      bike: bikeId,
      stationSalida: this.estacion._id,
      horaInicio: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      activo: true
    }).subscribe({
      next: () => {
        this.mensaje = '¡Bicicleta alquilada con éxito!';
        this.ngOnInit();
      },
      error: (err: any) => {
        this.mensaje = err.error?.msg || 'Error al alquilar bicicleta';
      }
    });
  }

  devolverBicicleta() {
    const { bookId } = this.devolucionForm.value;
    this.mensaje = '';
    this.alquilerService.devolver({ alquilerId: bookId, stationId: this.estacion?._id }).subscribe({
      next: () => {
        this.mensaje = '¡Bicicleta devuelta con éxito!';
        this.ngOnInit();
      },
      error: (err: any) => {
        this.mensaje = err.error?.msg || 'Error al devolver bicicleta';
      }
    });
  }
}
