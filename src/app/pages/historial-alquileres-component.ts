import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../services/book.service';
import { StationService } from '../services/station.service';
import { Book } from '../models/book.model';
import { Station } from '../models/station.model';

@Component({
  selector: 'app-historial-alquileres',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, FormsModule, CommonModule],
  templateUrl: './historial-alquileres-component.html',
  styleUrls: ['./historial-alquileres-component.css']
})
export class HistorialAlquileresComponent implements OnInit {
  alquileres: Book[] = [];
  estaciones: Station[] = [];
  alquilerId: string = '';
  stationId: string = '';
  mensaje: string = '';
  error: string = '';
  devolviendo: boolean = false;
  loading: boolean = true;

  get alquileresActivos(): Book[] {
    return this.alquileres.filter(a => a.activo === true);
  }

  constructor(
    private bookService: BookService,
    private stationService: StationService
  ) {}

  ngOnInit() {
    this.cargarAlquileres();
    this.stationService.getStations().subscribe((estaciones: Station[]) => this.estaciones = estaciones);
  }

  cargarAlquileres() {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (alqs: Book[]) => {
        this.alquileres = [...alqs];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al cargar los alquileres.';
      }
    });
  }

  devolver() {
    this.mensaje = '';
    this.error = '';
    if (!this.alquilerId || !this.stationId) {
      this.error = 'Completa todos los campos.';
      return;
    }
    this.devolviendo = true;
    this.bookService.devolver({ alquilerId: this.alquilerId, stationId: this.stationId }).subscribe({
      next: (res) => {
        this.mensaje = res?.msg || '¡Bicicleta devuelta correctamente!';
        this.devolviendo = false;
        this.alquilerId = '';
        this.stationId = '';
        setTimeout(() => {
          this.cargarAlquileres();
        }, 1200);
      },
      error: (err) => {
        this.error = err?.error?.msg || 'Error al devolver la bicicleta.';
        this.devolviendo = false;
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
