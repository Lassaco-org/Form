import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';

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

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get Current Rating Agency ID
    this.currentShortCode = this.activatedRoute.snapshot.params;
    console.log(this.currentShortCode);

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
}
