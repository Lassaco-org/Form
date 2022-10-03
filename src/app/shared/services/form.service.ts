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
    this.userData = localStorage.getItem('survey-question');
    let data = JSON.parse(this.userData);
    return data;
  }

  // Add Question Field to localstorage
  addQuestionFieldToLocalStorage(data: any): void {
    let allData = JSON.parse(localStorage.getItem('survey-question') || '[]');
    allData.push(data);
    return localStorage.setItem('survey-question', JSON.stringify(allData));
  }

  // Add Question Field to localstorage
  removeQuestionFieldToLocalStorage(index: any): void {
    let allData = JSON.parse(localStorage.getItem('survey-question') || '[]');
    allData.splice(index, 1);
    return localStorage.setItem('survey-question', JSON.stringify(allData));
  }

  // Add Question Field to localstorage
  addQuestionOptionsFieldToLocalStorage(data: any, questionindex: any): void {
    let allData = JSON.parse(localStorage.getItem('survey-question') || '[]');
    allData.push(data);
    return localStorage.setItem('survey-question', JSON.stringify(data));
  }

  // Add Question Field to localstorage
  removeQuestionOptionsFieldToLocalStorage(
    questionIndex: any,
    optionIndex: any
  ): void {
    let allData = JSON.parse(localStorage.getItem('survey-question') || '[]');

    let questionFields = allData.forEach((e: any, index: any) => {
      if (index === questionIndex) {
        e.questionOptionFields.splice(optionIndex, 1);
      }
    });
    // console.log(allData);

    return localStorage.setItem('survey-question', JSON.stringify(allData));
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
