import { Component, OnInit } from '@angular/core';
import { ResponseService } from 'src/app/shared/services/response.service';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/admin/services/excel.service';

// Register the Chart Elements
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip
);

@Component({
  selector: 'app-display-survey-responses',
  templateUrl: './display-survey-responses.component.html',
  styleUrls: ['./display-survey-responses.component.scss'],
})
export class DisplaySurveyResponsesComponent implements OnInit {
  public chart: any;
  isAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isShareModal: boolean = false;
  formId: string = '';
  responses: any;
  dataLoading: boolean = true;
  currentShortCode: any;
  survey: any;
  totalSurveyResponses: any;
  resultArray: any;

  constructor(
    private responseService: ResponseService,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    // Get Current Rating Agency ID
    this.currentShortCode = this.activatedRoute.snapshot.params;

    // Get Survey
    this.formService
      .getFormByShortCode(this.currentShortCode.shortCode)
      .subscribe({
        next: (res: any) => {
          this.survey = res.data;
          // Get form responses
          this.responseService.getResponseForForm(this.survey._id).subscribe({
            next: (res: any) => {
              let result = res.data.docs;
              this.totalSurveyResponses = result.length;
              this.resultArray = [];
              result.forEach((r: any) => {
                let resSurveyData = Object.values(r.data);
                resSurveyData.forEach((s: any) => {
                  s.forEach((q: any) => {
                    this.resultArray.push(q);
                  });
                });
              });

              this.mergeResponses(this.resultArray);
            },
            error: (e) => console.error(e),
          });
        },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
        },
      });
  }

  // Merge Responses
  mergeResponses(array: any) {
    this.responses = [];
    array.forEach((item: any) => {
      var existing = this.responses.filter((v: any, i: any) => {
        return v.name == item.name;
      });

      if (existing.length) {
        var existingIndex = this.responses.indexOf(existing[0]);
        this.responses[existingIndex].value = this.responses[
          existingIndex
        ].value.concat(item.value);
      } else {
        if (typeof item.value == 'string') {
          item.value = [item.value];
          this.responses.push(item);
        } else {
          item.value = [''];
          // this.responses.push(item);
        }
      }
    });
    console.log(this.responses);
  }

  // Export as Excel
  exportexcel() {
    this.responseService.getResponseForForm(this.survey._id).subscribe({
      next: (res: any) => {
        let exportResult = res.data.docs;
        let exportResultArray: any[] = [];
        exportResult.forEach((r: any) => {
          let resSurveyData = Object.values(r.data);
          resSurveyData.forEach((s: any) => {
            s.forEach((q: any) => {
              exportResultArray.push(q);
            });
          });
        });
        let newExportResultArray = exportResultArray.map((r: any) => ({
          [r.name]: r.value,
        }));

        console.log(newExportResultArray);
        this.excelService.exportExcel(newExportResultArray);
      },
      error: (e) => console.error(e),
      complete: () => {},
    });

    const hello = [
      {
        'How many states do we have in Nigeria?': '10',
        'Which of these states have you been to?': null,
        'What do you think about the new Naira notes designs?':
          'I dont like it',
      },
      {
        'How many states do we have in Nigeria?': '36',
        'Which of these states have you been to?': null,
        'What do you think about the new Naira notes designs?': 'Make sense',
      },
      {
        'How many states do we have in Nigeria?': '"23"',
        'Which of these states have you been to?': null,
        'What do you think about the new Naira notes designs?': 'fine',
      },
    ];

    // this.excelService.exportExcel(hello);
  }

  // createChart() {
  //   this.chart = new Chart('chart1', {
  //     type: 'bar',

  //     data: {
  //       // values on X-Axis
  //       labels: [
  //         '2022-05-10',
  //         '2022-05-11',
  //         '2022-05-12',
  //         '2022-05-13',
  //         '2022-05-14',
  //         '2022-05-15',
  //         '2022-05-16',
  //         '2022-05-17',
  //       ],
  //       datasets: [
  //         {
  //           label: 'Sales',
  //           data: ['467', '576', '572', '79', '92', '574', '573', '576'],
  //           backgroundColor: 'blue',
  //         },
  //         {
  //           label: 'Profit',
  //           data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
  //           backgroundColor: 'limegreen',
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       aspectRatio: 2.5,
  //     },
  //   });

  //   this.chart = new Chart('chart2', {
  //     type: 'doughnut',

  //     data: {
  //       // values on X-Axis
  //       labels: [
  //         '2022-05-10',
  //         '2022-05-11',
  //         '2022-05-12',
  //         '2022-05-13',
  //         '2022-05-14',
  //         '2022-05-15',
  //         '2022-05-16',
  //         '2022-05-17',
  //       ],
  //       datasets: [
  //         {
  //           label: 'Sales',
  //           data: ['467', '576', '572', '79', '92', '574', '573', '576'],
  //           backgroundColor: 'blue',
  //         },
  //         {
  //           label: 'Profit',
  //           data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
  //           backgroundColor: 'limegreen',
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       aspectRatio: 2.5,
  //     },
  //   });
  // }

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
