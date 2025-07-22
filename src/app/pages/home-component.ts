import { Component, OnInit } from '@angular/core';
import { StationService } from '../services/station.service';
import { Station } from '../models/station.model';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, RouterModule],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent implements OnInit {
  estaciones: Station[] = [];

  constructor(private stationService: StationService) {}

  ngOnInit() {
    this.stationService.getStations().subscribe((estaciones: Station[]) => {
      this.estaciones = estaciones;
    });
  }
}
