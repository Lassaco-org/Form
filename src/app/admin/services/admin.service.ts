import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { IAuth } from 'src/app/shared/interfaces/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  // Get All Admins
  getAdmins(): Observable<IAuth> {
    return this.http
      .get<IAuth>(`${this.baseUrl}admin/users`, this.getHttpOptions())
      .pipe(
        switchMap((res: any) => {
          console.log(`Admins fetched successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error('Failed to fetch Admin'));
        })
      );
  }

  // Create Admin
  createAdmin(data: any): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${this.baseUrl}admin/users`, data, this.getHttpOptions())
      .pipe(
        switchMap((res: any) => {
          console.log(`Admin created successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Update Admin status
  updateStatus(userId: string, data: any): Observable<IAuth> {
    return this.http
      .put<IAuth>(
        `${this.baseUrl}admin/users/${userId}`,
        data,
        this.getHttpOptions()
      )
      .pipe(
        switchMap((res: any) => {
          console.log(`Admin Status changed successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return httpOptions;
  }
}
