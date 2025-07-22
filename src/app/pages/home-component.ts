import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StationService } from '../services/station.service';
import { Station } from '../models/station.model';
import { RouterModule } from '@angular/router';
import { NgForOf, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf, NgIf, CommonModule, RouterModule],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  estaciones: Station[] = [];

  constructor(
    private stationService: StationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.stationService.getStations().subscribe((estaciones: Station[]) => {
      this.estaciones = estaciones;
      this.cdr.markForCheck();
    });
  }
}
