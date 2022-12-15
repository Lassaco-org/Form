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
          console.log(`Responses fetched successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  
  // get response for a form
  getResponseForForm(surveyId: string): Observable<IResponse> {
    return this.http
      .get<IResponse>(
        `${this.baseUrl}response?form=${surveyId}`,
        this.getHttpOptions()
      )
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
      
    // Download response
    downloadResponses(surveyId: string): Observable<IResponse> {
      return this.http
        .get<IResponse>(`${this.baseUrl}response/download/${surveyId}`, this.getHttpOptions())
        .pipe(
          switchMap((res: any) => {
            console.log(`Responses downloaded successfully`, res);
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

  // Clear Responses
  clearResponses(surveyId: string): Observable<IResponse> {
    return this.http
      .delete<IResponse>(
        `${this.baseUrl}response/all/${surveyId}`,
        this.getHttpOptions()
      )
      .pipe(
        switchMap((res: any) => {
          console.log(`Response cleared successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  async addPage(data: any, shortCode: string) {
    try {
      const r = await fetch(`${this.baseUrl}response/public/${shortCode}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: data,
      });
      const result = await r.json();
      if (result.message === 'Form submitted successfully') {
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
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
