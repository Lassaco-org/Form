import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Get Users
  getUsers(): Observable<IAuth> {
    return this.http.get<IAuth>(`${this.baseUrl}auth/login`).pipe(
      switchMap((res: any) => {
        console.log(`Users fetched successfully`, res);
        return of(res);
      }),
      catchError((err: any) => {
        return throwError(() => new Error('Failed to fetch Users'));
      })
    );
  }

  // Get Users
  loginUser(data: any): Observable<IAuth> {
    return this.http.post<IAuth>(`${this.baseUrl}auth/login`, data).pipe(
      switchMap((res: any) => {
        console.log(`User added successfully`, res);
        return of(res);
      }),
      catchError((err: any) => {
        return throwError(() => new Error('Failed to add User'));
      })
    );
  }
}
