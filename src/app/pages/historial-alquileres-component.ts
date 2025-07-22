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
  confirmMsg: string = '';
  errorMsg: string = '';
  devolviendo: boolean = false;

  get alquileresActivos(): Book[] {
    return this.alquileres.filter(a => a.activo);
  }

  constructor(private bookService: BookService, private stationService: StationService) {}

  ngOnInit() {
    this.loadAlquileres();
    this.stationService.getStations().subscribe((estaciones: Station[]) => this.estaciones = estaciones);
  }

  loadAlquileres() {
    this.bookService.getBooks().subscribe((alqs: Book[]) => this.alquileres = alqs);
  }

  devolver() {
    this.confirmMsg = '';
    this.errorMsg = '';
    if (!this.alquilerId || !this.stationId) {
      this.errorMsg = 'Completa todos los campos.';
      return;
    }
    this.bookService.devolver({ alquilerId: this.alquilerId, stationId: this.stationId }).subscribe({
      next: () => {
        this.confirmMsg = '¡Bicicleta devuelta correctamente!';
        this.loadAlquileres();
      },
      error: () => {
        this.errorMsg = 'Error al devolver la bicicleta.';
      }
    });
  }

  // Métodos auxiliares para el template
  getBikeSerial(bike: any): string {
    return typeof bike === 'string' ? bike : bike.serial;
  }
  getStationName(station: any): string {
    return typeof station === 'string' ? station : station.name;
  }
}
