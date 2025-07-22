import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/alquileres`);
  }

  alquilar(data: any): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/alquilar`, data);
  }

  devolver(data: { alquilerId: string; stationId: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/devolver`, data);
  }
} 