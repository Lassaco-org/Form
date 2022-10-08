import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-survey-preview',
  templateUrl: './survey-preview.component.html',
  styleUrls: ['./survey-preview.component.scss'],
})
export class SurveyPreviewComponent implements OnInit {
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
