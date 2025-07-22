import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StationService, Station } from '../../station.service';
import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { FooterComponent } from '../../components/footer-component/footer-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-componet',
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './home-componet.html',
  styleUrl: './home-componet.css'
})
export class HomeComponet implements OnInit {
  estaciones: Station[] = [];
  loading = true;
  error = '';

  constructor(private stationService: StationService, private router: Router) {}

  ngOnInit(): void {
    this.stationService.getAll().subscribe({
      next: (data) => {
        this.estaciones = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar estaciones';
        this.loading = false;
      }
    });
  }

  verDetalle(estacion: Station) {
    this.router.navigate(['/detalle-estacion'], { queryParams: { id: estacion._id } });
  }
}
