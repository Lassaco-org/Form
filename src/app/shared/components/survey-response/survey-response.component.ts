import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { FormService } from '../../services/form.service';
import { ResponseService } from '../../services/response.service';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.scss'],
})
export class SurveyResponseComponent implements OnInit {
  survey: any;
  currentSectionNumber: number = 1;
  dataLoading: boolean = true;
  currentShortCode: any;
  responses: any;
  isAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  questionSectionLength: any;

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private responseService: ResponseService
  ) {}

  ngOnInit(): void {
    // Get Current Rating Agency ID
    this.currentShortCode = this.activatedRoute.snapshot.params;

    // Get Survey
    this.formService.getFormByShortCode('ASN105').subscribe({
      next: (res: any) => {
        this.survey = res.data;
        let surveyQuestion = this.survey.questions;
        this.questionSectionLength = Object.keys(surveyQuestion).length;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  previousSection() {
    this.currentSectionNumber--;
    this.scrollToTop();
  }

  nextSection() {
    this.currentSectionNumber++;
    this.scrollToTop();
  }

  // Submit response
  submitResponse() {
    this.router.navigate([
      `/surveys/${this.currentShortCode.shortCode}/submitted`,
    ]);
    // this.responseService
    //   .addResponse('payload', this.currentShortCode.shortCode)
    //   .pipe(first())
    //   .subscribe({
    //     next: (res: any) => {
    //       // If status is true
    //       console.log(res);

    //       this.showAlert('Done!', 'success');

    //       // Route user
    //       setTimeout(() => {
    //         // Route user
    //         this.router.navigate([
    //           `/surveys/${this.currentShortCode.shortCode}/submitted`,
    //         ]);
    //       }, 3000);
    //     },
    //     error: (e) => {
    //       console.error(e.message);

    //       // Show error message
    //       this.showAlert(e.message, 'error');
    //     },
    //   });
  }

  // Show alert
  showAlert(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }

  // Scroll Up
  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
