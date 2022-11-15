import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-survey-preview',
  templateUrl: './survey-preview.component.html',
  styleUrls: ['./survey-preview.component.scss'],
})
export class SurveyPreviewComponent implements OnInit {
  // isAlert: boolean = false;
  // alertMessage: string = '';
  // alertColor: string = '';
  // dataLoading: boolean = true;
  survey: any;
  currentSectionNumber: number = 0;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    // Get survey from localstorage
    this.survey = this.formService.getQuestionFieldFromLocalStorage();
  }

  previousSection() {
    this.currentSectionNumber--;
    this.scrollToTop();
  }

  nextSection() {
    this.currentSectionNumber++;
    this.scrollToTop();
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
