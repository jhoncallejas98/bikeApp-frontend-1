import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  _id?: string;
  user: string;
  bike: any;
  stationSalida: any;
  fechaInicio?: string;
  horaInicio?: string;
  fechaFin?: string;
  horaFin?: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class AlquilerService {
  constructor(private http: HttpClient) {}

  alquilar(data: any): Observable<any> {
    return this.http.post('/alquilar', data);
  }

  devolver(data: any): Observable<any> {
    return this.http.post('/devolver', data);
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/book');
  }
} 