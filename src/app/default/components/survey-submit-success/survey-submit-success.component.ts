import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-submit-success',
  templateUrl: './survey-submit-success.component.html',
  styleUrls: ['./survey-submit-success.component.scss'],
})
export class SurveySubmitSuccessComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }
}
