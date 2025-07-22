import { Component, OnInit } from '@angular/core';
import { AlquilerService, Book } from '../../book.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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

  constructor(private alquilerService: AlquilerService, private router: Router) {}

  ngOnInit(): void {
    this.cargarAlquileres();
  }

  cargarAlquileres(): void {
    this.loading = true;
    this.error = '';
    this.alquilerService.getAll().subscribe({
      next: (data: Book[]) => {
        this.alquileresActivos = data.filter((a: Book) => a.activo);
        this.alquileresFinalizados = data.filter((a: Book) => !a.activo);
        this.loading = false;
      },
      error: (err: any) => {
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
