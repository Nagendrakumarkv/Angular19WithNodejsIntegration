import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:3000'; // Update with your Render URL
  private accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWRmNzBlYjFhYTE2OGI4NThiYjVkYSIsImlhdCI6MTc0NTM3NDAyNSwiZXhwIjoxNzQ1Mzc3NjI1fQ.G5PoqiTLzvFWfYD8z_9eRz3Wa5czMQDhUlLdkmmQHwM';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/messages`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .pipe(catchError(this.handleError<any[]>('getMessages', [])));
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<any>(`${this.apiUrl}/messages/upload`, formData, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .pipe(catchError(this.handleError<any>('uploadFile', {})));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
