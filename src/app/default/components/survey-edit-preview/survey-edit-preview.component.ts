import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-survey-edit-preview',
  templateUrl: './survey-edit-preview.component.html',
  styleUrls: ['./survey-edit-preview.component.scss'],
})
export class SurveyEditPreviewComponent implements OnInit {
  survey: any;
  currentSectionNumber: number = 1;
  currentShortCode: any;
  dataLoading: boolean = true;
  questionSectionLength: number;

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get Current Rating Agency ID
    this.currentShortCode = this.activatedRoute.snapshot.params;

    // Get Survey
    this.formService
      .getFormByShortCode(this.currentShortCode.shortCode)
      .subscribe({
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

  // Previous section
  previousSection() {
    this.currentSectionNumber--;
    this.scrollToTop();
  }

  // Next section
  nextSection() {
    this.currentSectionNumber++;
    this.scrollToTop();
  }

  // Submit response
  submitResponse() {
    this.router.navigate([
      `/surveys/${this.currentShortCode.shortCode}/submitted`,
    ]);
  }

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }

  // Scroll Up
  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
