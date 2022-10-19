import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-survey-preview',
  templateUrl: './survey-preview.component.html',
  styleUrls: ['./survey-preview.component.scss'],
})
export class SurveyPreviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }
}
