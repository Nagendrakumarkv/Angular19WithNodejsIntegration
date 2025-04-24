import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = environment.production
    ? 'https://nodejs-mongodb-learning.onrender.com'
    : 'http://localhost:3000';

  private accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWRmNzBlYjFhYTE2OGI4NThiYjVkYSIsImlhdCI6MTc0NTQ2Mjk4NiwiZXhwIjoxNzQ1NDY2NTg2fQ.O7YUImp6Sxo52d3g-hVyz7l85ZOk0vNjfzhkvCRNnkE';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    const token = localStorage.getItem('jwt_token') || this.accessToken; // Replace with your token logic
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this.http
      .get<Message[]>(`${this.apiUrl}/messages`, { headers })
      .pipe(
        tap((response) => console.log('Messages fetched:', response)),
        catchError(this.handleError<Message[]>('getMessages', []))
      );
  }

  uploadFile(file: File): Observable<any> {
    const token = localStorage.getItem('jwt_token') || this.accessToken;
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<any>(`${this.apiUrl}/messages/upload`, formData, { headers })
      .pipe(
        tap((response) => console.log('File uploaded:', response)),
        catchError(this.handleError<any>('uploadFile', {}))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
