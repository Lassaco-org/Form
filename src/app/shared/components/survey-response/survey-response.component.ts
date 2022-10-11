import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.scss'],
})
export class SurveyResponseComponent implements OnInit {
  surveys: any;
  sectionNumber: number = 1;
  dataLoading: boolean = true;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    // Get All Surveys
    this.formService.getForms().subscribe({
      next: (res: any) => {
        this.surveys = res.data.docs;
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
    console.log(this.sectionNumber);
  }

  nextSection() {
    this.sectionNumber++;
    console.log(this.sectionNumber);
  }
}
