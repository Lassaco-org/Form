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
  addSectionToLocalStorage(data: any): void {
    let allData = JSON.parse(localStorage.getItem('survey-questions') || '[]');
    allData.push(data);
    return localStorage.setItem('survey-questions', JSON.stringify(allData));
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
