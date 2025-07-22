import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../../book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-alquileres-component',
  imports: [CommonModule],
  templateUrl: './historial-alquileres-component.html',
  styleUrl: './historial-alquileres-component.css'
})
export class HistorialAlquileresComponent implements OnInit {
  alquileresActivos: Book[] = [];
  alquileresFinalizados: Book[] = [];
  loading = true;
  error = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.alquileresActivos = data.filter(a => a.activo);
        this.alquileresFinalizados = data.filter(a => !a.activo);
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar alquileres';
        this.loading = false;
      }
    });
  }

  getBikeSerial(bike: any): string {
    return bike && typeof bike === 'object' && 'serial' in bike ? bike.serial : String(bike);
  }

  getStationName(station: any): string {
    return station && typeof station === 'object' && 'name' in station ? station.name : String(station);
  }
}
