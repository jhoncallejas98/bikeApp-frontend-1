import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../models/bike.model';

@Injectable({ providedIn: 'root' })
export class BikeService {
  private apiUrl = 'http://localhost:3000/bicicletas';

  constructor(private http: HttpClient) {}

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.apiUrl);
  }

  getBikeById(id: string): Observable<Bike> {
    return this.http.get<Bike>(`${this.apiUrl}/${id}`);
  }
} 