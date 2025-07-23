import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
import { StationService } from '../services/station.service';
import { Book } from '../models/book.model';
import { Station } from '../models/station.model';

@Component({
  selector: 'app-historial-alquileres',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  templateUrl: './historial-alquileres-component.html',
  styleUrls: ['./historial-alquileres-component.css']
})
export class HistorialAlquileresComponent implements OnInit {
  alquileres: Book[] = [];
  estaciones: Station[] = [];
  alquilerId: string = '';
  stationId: string = '';
  confirmMsg: string = '';
  errorMsg: string = '';
  devolviendo: boolean = false;
  loading: boolean = true;

  constructor(
    private bookService: BookService,
    private stationService: StationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarAlquileres();
    this.stationService.getStations().subscribe({
      next: (estaciones) => {
        this.estaciones = estaciones;
        this.cdr.detectChanges();
      }
    });
  }

  cargarAlquileres() {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (alqs: Book[]) => {
        this.alquileres = alqs;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Error al cargar los alquileres.';
        this.cdr.detectChanges();
      }
    });
  }

  get alquileresActivos(): Book[] {
    return this.alquileres.filter(a => a.activo === true);
  }

  devolver() {
    this.confirmMsg = '';
    this.errorMsg = '';
    if (!this.alquilerId || !this.stationId) {
      this.errorMsg = 'Completa todos los campos.';
      this.cdr.detectChanges();
      return;
    }
    this.devolviendo = true;
    this.bookService.devolver({ alquilerId: this.alquilerId, stationId: this.stationId }).subscribe({
      next: (res) => {
        this.confirmMsg = res?.msg || '¡Bicicleta devuelta correctamente!';
        this.devolviendo = false;
        this.alquilerId = '';
        this.stationId = '';
        this.cargarAlquileres();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMsg = err?.error?.msg || 'Error al devolver la bicicleta.';
        this.devolviendo = false;
        this.cdr.detectChanges();
      }
    });
  }

  getBikeSerial(bike: any): string {
    return typeof bike === 'string' ? bike : bike.serial;
  }
  getStationName(station: any): string {
    return typeof station === 'string' ? station : station.name;
  }
}
