import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgStyle, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StationService } from '../services/station.service';
import { BookService } from '../services/book.service';
import { Station } from '../models/station.model';
import { Bike } from '../models/bike.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detalle-estacion',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle, FormsModule, CommonModule],
  templateUrl: './detalle-estacion-component.html',
  styleUrls: ['./detalle-estacion-component.css']
})
export class DetalleEstacionComponent implements OnInit {
  station: Station | null = null;
  bikes: Bike[] = [];
  selectedBike: string = '';
  user: string = '';
  horaInicio: string = '';
  confirmMsg: string = '';
  errorMsg: string = '';

  constructor(
    private route: ActivatedRoute,
    private stationService: StationService,
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.stationService.getStationById(id).subscribe({
          next: (station) => {
            this.station = station;
            this.bikes = (station.bikes || []).filter(b => (b.status || '').toLowerCase() === 'disponible');
            this.cdr.detectChanges();
          },
          error: () => {
            this.errorMsg = 'No se pudo cargar la estación.';
            this.cdr.detectChanges();
          }
        });
      }
    });
  }

  alquilar() {
    this.confirmMsg = '';
    this.errorMsg = '';
    if (!this.selectedBike || !this.user || !this.horaInicio) {
      this.errorMsg = 'Completa todos los campos.';
      this.cdr.detectChanges();
      return;
    }
    const data = {
      user: this.user,
      bike: this.selectedBike,
      stationSalida: this.station?._id,
      fechaInicio: new Date().toISOString(),
      horaInicio: this.horaInicio
    };
    this.bookService.alquilar(data).subscribe({
      next: () => {
        this.confirmMsg = '¡Alquiler realizado con éxito!';
        this.selectedBike = '';
        this.user = '';
        this.horaInicio = '';
        if (this.station) {
          this.stationService.getStationById(this.station._id).subscribe({
            next: (station) => {
              this.station = station;
              this.bikes = (station.bikes || []).filter(b => (b.status || '').toLowerCase() === 'disponible');
              this.cdr.detectChanges();
            }
          });
        } else {
          this.cdr.detectChanges();
        }
      },
      error: () => {
        this.errorMsg = 'Error al realizar el alquiler.';
        this.cdr.detectChanges();
      }
    });
  }
}
