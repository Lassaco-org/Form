import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  userData: any;

  constructor(private http: HttpClient) {}

  // Is logged In
  isLoggedIn() {
    return this.getToken() !== null;
  }

  // Set Token and save to localstorage
  addUserDataToLocalStorage(data: any): void {
    // localStorage.setItem('token', token)
    localStorage.setItem('data', JSON.stringify(data));
  }

  // Set Token to localstorage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get Token from localstorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get Users Data from Local storage
  getUserFromLocalStorage() {
    this.userData = localStorage.getItem('data');
    let data = JSON.parse(this.userData);
    return data;
  }

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
        console.log(`User Logged In successfully`, res);
        return of(res);
      }),
      catchError((err: any) => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  // Request Password Reset
  requestEmailVerification(email: string): Observable<IAuth> {
    return this.http
      .get<IAuth>(
        `${this.baseUrl}auth/request-email-verification?email=${email}`
      )
      .pipe(
        switchMap((res: any) => {
          console.log(`Code sent successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Verify Email
  verifyEmail(data: any): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${this.baseUrl}auth/verify-email-account`, data)
      .pipe(
        switchMap((res: any) => {
          console.log(`Email verified successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Request Password Reset
  requestPasswordReset(email: string): Observable<IAuth> {
    return this.http
      .get<IAuth>(`${this.baseUrl}auth/request-reset-password?email=${email}`)
      .pipe(
        switchMap((res: any) => {
          console.log(`Code sent successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Password Reset
  resetPassword(data: any): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${this.baseUrl}auth/reset-password`, data)
      .pipe(
        switchMap((res: any) => {
          console.log(`Password reset successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Change Password
  changePassword(data: any): Observable<IAuth> {
    return this.http
      .post<IAuth>(
        `${this.baseUrl}auth/change-password`,
        data,
        this.getHttpOptions()
      )
      .pipe(
        switchMap((res: any) => {
          console.log(`Password changed successfully`, res);
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
