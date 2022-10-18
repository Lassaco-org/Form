import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  sectionNumber: number = 1;
  dataLoading: boolean = true;
  currentShortCode: any;
  responses: any;
  isAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private responseService: ResponseService
  ) {}

  ngOnInit(): void {
    // Get Current Rating Agency ID
    this.currentShortCode = this.activatedRoute.snapshot.params;

    // Get All Surveys
    this.formService.getFormByShortCode('ASN105').subscribe({
      next: (res: any) => {
        this.survey = res.data;
        console.log(this.survey);

        // let hi = this.surveys[0].questions;
        // console.log(hi[1].length);
        // this.surveys[0].questions;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  previousSection() {
    this.sectionNumber--;
  }

  nextSection() {
    this.sectionNumber++;
  }

  // Submit response
  submitResponse() {
    this.responseService
      .addResponse('payload', this.currentShortCode.shortCode)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          console.log(res);

          this.showAlert('Done!', 'success');

          // Route user
          // setTimeout(() => {
          //   // Route user
          //   this.router.navigate([
          //     `/auth/verify-email/${this.userForm.value.username}`,
          //   ]);
          // }, 3000);
        },
        error: (e) => {
          console.error(e.message);

          // Show error message
          this.showAlert(e.message, 'error');
        },
      });
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
}
