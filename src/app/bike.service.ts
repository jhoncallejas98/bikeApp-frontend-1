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
export class BicicletaService {
  constructor(private http: HttpClient) {}

  getAll(estado?: string): Observable<Bike[]> {
    let url = '/bicicletas';
    if (estado) url += `?estado=${estado}`;
    return this.http.get<Bike[]>(url);
  }
} 