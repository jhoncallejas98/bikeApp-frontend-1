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
export class StationService {
  private apiUrl = '/api/station';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Station[]> {
    return this.http.get<Station[]>(this.apiUrl);
  }

  getById(id: string): Observable<Station> {
    return this.http.get<Station>(`${this.apiUrl}/${id}`);
  }

  create(station: Partial<Station>): Observable<Station> {
    return this.http.post<Station>(this.apiUrl, station);
  }

  update(id: string, station: Partial<Station>): Observable<Station> {
    return this.http.put<Station>(`${this.apiUrl}/${id}`, station);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 