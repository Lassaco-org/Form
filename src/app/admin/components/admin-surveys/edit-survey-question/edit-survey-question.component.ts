import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-edit-survey-question',
  templateUrl: './edit-survey-question.component.html',
  styleUrls: ['./edit-survey-question.component.scss'],
})
export class EditSurveyQuestionComponent implements OnInit {
  isAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isShareModal: boolean = false;
  formId: string = '';
  currentShortCode: any;
  survey: any;
  dataLoading: boolean = true;

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get Current Rating Agency ID
    this.currentShortCode = this.activatedRoute.snapshot.params;

    // Get Survey
    this.formService.getFormByShortCode('ASN105').subscribe({
      next: (res: any) => {
        this.survey = res.data;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Open share modal
  openShareModal(formId: any) {
    this.formId = formId;
    this.isShareModal = true;
  }

  // close share modal
  closeShareModal() {
    this.isShareModal = false;
  }
}
