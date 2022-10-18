import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  baseUrl: string = environment.baseUrl;
  userData: any;

  constructor(private http: HttpClient, private router: Router) {}

  // get response
  getResponses(): Observable<IResponse> {
    return this.http
      .get<IResponse>(`${this.baseUrl}response`, this.getHttpOptions())
      .pipe(
        switchMap((res: any) => {
          console.log(`Response fetched successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Post Response
  addResponse(data: any, shortCode: string): Observable<IResponse> {
    return this.http
      .post<IResponse>(
        `${this.baseUrl}response/public/${shortCode}`,
        data,
        this.getHttpOptions()
      )
      .pipe(
        switchMap((res: any) => {
          console.log(`Response added successfully`, res);
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
