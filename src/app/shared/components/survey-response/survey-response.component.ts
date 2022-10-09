import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.scss'],
})
export class SurveyResponseComponent implements OnInit {
  surveys: any;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    // Get All Surveys
    this.formService.getForms().subscribe({
      next: (res: any) => {
        this.surveys = res.data.docs;
        console.log(res.data.docs);
      },
      error: (e) => console.error(e),
      complete: () => {
        // this.dataLoading = false;
      },
    });
  }
}
