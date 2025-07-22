import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../models/station.model';

@Injectable({ providedIn: 'root' })
export class StationService {
  private apiUrl = 'http://localhost:3000/estaciones';

  constructor(private http: HttpClient) {}

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.apiUrl);
  }

  getStationById(id: string): Observable<Station> {
    return this.http.get<Station>(`${this.apiUrl}/${id}`);
  }
} 