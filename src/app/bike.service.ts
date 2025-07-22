import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bike {
  _id?: string;
  serial: string;
  status: 'disponible' | 'en uso' | 'en mantenimiento';
  capacity: number;
  availableBikes: number;
}

@Injectable({ providedIn: 'root' })
export class BikeService {
  private apiUrl = '/api/bike';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bike[]> {
    return this.http.get<Bike[]>(this.apiUrl);
  }

  getById(id: string): Observable<Bike> {
    return this.http.get<Bike>(`${this.apiUrl}/${id}`);
  }

  create(bike: Partial<Bike>): Observable<Bike> {
    return this.http.post<Bike>(this.apiUrl, bike);
  }

  update(id: string, bike: Partial<Bike>): Observable<Bike> {
    return this.http.put<Bike>(`${this.apiUrl}/${id}`, bike);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 