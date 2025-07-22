import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Station {
  _id?: string;
  name: string;
  location: string;
  capacity: number;
  availableBikes: number;
}

@Injectable({ providedIn: 'root' })
export class EstacionService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Station[]> {
    return this.http.get<Station[]>('/estaciones');
  }

  getById(id: string): Observable<Station> {
    return this.http.get<Station>(`/estaciones/${id}`);
  }
} 