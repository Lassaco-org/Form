import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-survey-question',
  templateUrl: './add-survey-question.component.html',
  styleUrls: ['./add-survey-question.component.scss'],
})
export class AddSurveyQuestionComponent implements OnInit {
  isAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isShareModal: boolean = false;
  formId: string = '';
  newSurveyData: any;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    // Get the title and descrp from localstorage if it exist
    this.newSurveyData = JSON.parse(localStorage.getItem('new-survey') || '[]');
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
