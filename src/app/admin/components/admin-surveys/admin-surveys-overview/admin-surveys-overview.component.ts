import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-admin-surveys-overview',
  templateUrl: './admin-surveys-overview.component.html',
  styleUrls: ['./admin-surveys-overview.component.scss'],
})
export class AdminSurveysOverviewComponent implements OnInit {
  surveys: any;
  dataLoading: boolean = true;
  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  alertColor: string = '';
  isShareModal: boolean = false;
  test: string =
    'User Research Survey Questions For An Online Marketplace for Small Business Owners.';
  surveyShortCode: string = '';

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get All Admins
    this.formService.getForms().subscribe({
      next: (res: any) => {
        this.surveys = res.data.docs;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Edit Survey
  editSurvey(survey: any) {
    if (survey.available === true) {
      this.router.navigate([`/admin/surveys/${survey?.shortCode}/edit-survey`]);
    } else {
      this.showAlert('Survey suspend!', 'error');
    }
  }

  // Response Analyze Survey
  analyzeSurvey(survey: any) {
    if (survey.available === true) {
      this.router.navigate([`/admin/surveys/${survey?.shortCode}/response`]);
    } else {
      this.showAlert('Survey suspend!', 'error');
    }
  }

  // Suspend Survey
  updateSurveyStatus(survey: any) {
    let payload = {
      title: survey.title,
      available: survey.available == true ? false : true,
    };

    console.log(payload);

    this.formService
      .updateStatus(survey._id, payload)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          if (res.message === 'Form updated successfully') {
            this.showAlert(res.message, 'success');
            this.ngOnInit();
          }
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

  // Open share modal
  openShareModal(survey: any) {
    if (survey.available === true) {
      this.surveyShortCode = survey.shortCode;
      this.isShareModal = true;
    } else {
      this.showAlert('Survey suspend!', 'error');
    }
  }

  // close share modal
  closeShareModal() {
    this.isShareModal = false;
  }
}
