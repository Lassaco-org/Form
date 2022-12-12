import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IForm } from '../interfaces/form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  baseUrl: string = environment.baseUrl;
  userData: any;

  constructor(private http: HttpClient, private router: Router) {}

  // get forms
  getForms(): Observable<IForm> {
    return this.http
      .get<IForm>(`${this.baseUrl}form`, this.getHttpOptions())
      .pipe(
        switchMap((res: any) => {
          console.log(`Forms fetched successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // get forms
  getFormByShortCode(shortCode: any): Observable<IForm> {
    return this.http
      .get<IForm>(`${this.baseUrl}form/${shortCode}`, this.getHttpOptions())
      .pipe(
        switchMap((res: any) => {
          console.log(`Form fetched successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // get forms
  addForm(data: any): Observable<IForm> {
    return this.http
      .post<IForm>(`${this.baseUrl}form/`, data, this.getHttpOptions())
      .pipe(
        switchMap((res: any) => {
          console.log(`Form added successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Share forms
  shareForm(data: any): Observable<IForm> {
    return this.http
      .post<IForm>(`${this.baseUrl}form/send`, data, this.getHttpOptions())
      .pipe(
        switchMap((res: any) => {
          console.log(`Form sent successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Update status forms
  updateStatus(surveyId: string, data: any): Observable<IForm> {
    return this.http
      .put<IForm>(
        `${this.baseUrl}form/${surveyId}`,
        data,
        this.getHttpOptions()
      )
      .pipe(
        switchMap((res: any) => {
          console.log(`Form updated successfully`, res);
          return of(res);
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  // Get Question Field to localstorage
  getQuestionFieldFromLocalStorage() {
    this.userData = localStorage.getItem('survey-questions');
    let data = JSON.parse(this.userData);
    return data;
  }

  setItem(allData: any) {
    localStorage.setItem('survey-questions', JSON.stringify(allData));
  }

  // Add Question Field to localstorage
  // addSectionToLocalStorage(data: any): void {
  //   let allData = JSON.parse(localStorage.getItem('survey-questions') || '[]');
  //   allData.push(data);
  //   return localStorage.setItem('survey-questions', JSON.stringify(allData));
  // }

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
