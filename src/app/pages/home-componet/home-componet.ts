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

  constructor(private stationService: EstacionService, private router: Router) {}

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

  verDetalle(estacion: Station) {
    this.router.navigate(['/detalle-estacion'], { queryParams: { id: estacion._id } });
  }
}
