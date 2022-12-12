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
import { ExcelService } from 'src/app/admin/services/excel.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

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
  aaa: any;
  anotherResponses: any;
  newChartArray: any;

  constructor(
    private responseService: ResponseService,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private excelService: ExcelService,
    private http: HttpClient
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

      this.exportexcel()
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


    let resLabel = this.responses.map((label: any) => {
      return label.name;
    });

    let resData = this.responses.map((data: any) => {
      return data.value;
    });
    let resDataType = this.resultArray.map((dataType: any) => {
      return dataType.type;
    });
    let resQuestId = this.resultArray.map((DataQuestKey: any) => {
      return DataQuestKey.questKey;
    });

    // console.log(resLabel);
    // console.log(resData);
    // console.log(resDataType);
    // console.log(resQuestId);

    // const lableData = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    // const mainData = ['467', '576', '572', '79', '92', '574', '573', '576'];

    // this.createChart(this.responses);
    // this.renderChart(resLabel, resData, resDataType, resQuestId);

    let first: any[] = [];
    let getfirst = this.responses[0].options.forEach((lab: any) => {
      first.push(lab.name);
    });
    let second = this.responses[0].value;
    let third = this.responses[0].type;
    let fourth = this.responses[0].questKey;

    // console.log(first, second, third, fourth);
    // this.renderChart(first, second, third, fourth);
  }

  // Export as Excel
  exportexcel() {
    // this.responseService.getResponseForForm(this.survey._id).subscribe({
    //   next: (res: any) => {
    //     let exportResult = res.data.docs;
    //     let exportResultArray: any[] = [];
    //     exportResult.forEach((r: any) => {
    //       let resSurveyData = Object.values(r.data);
    //       resSurveyData.forEach((s: any) => {
    //         s.forEach((q: any) => {
    //           exportResultArray.push(q);
    //         });
    //       });
    //     });
    //     let newExportResultArray = exportResultArray.map((r: any) => ({
    //       [r.name]: r.value,
    //     }));

    //     console.log(newExportResultArray);
    //     this.excelService.exportExcel(newExportResultArray);
    //   },
    //   error: (e) => console.error(e),
    //   complete: () => {},
    // });

    // const hello = [
    //   {
    //     'How many states do we have in Nigeria?': '10',
    //     'Which of these states have you been to?': null,
    //     'What do you think about the new Naira notes designs?':
    //       'I dont like it',
    //   },
    //   {
    //     'How many states do we have in Nigeria?': '36',
    //     'Which of these states have you been to?': null,
    //     'What do you think about the new Naira notes designs?': 'Make sense',
    //   },
    //   {
    //     'How many states do we have in Nigeria?': '23',
    //     'Which of these states have you been to?': null,
    //     'What do you think about the new Naira notes designs?': 'fine',
    //   },
    // ];

    // this.excelService.exportExcel(hello);

    this.http.get('assets/data/response-2.json').subscribe((res: any) => {

      this.anotherResponses = res.data.data
      this.newChartArray = []
      // console.log(this.anotherResponses);

      this.anotherResponses.forEach((element: any) => {
        // console.log(element);
        element.sectionQuestions.forEach((ee: any, index: any) => {
          console.log(ee);
          let ctx = 'chart' + index
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: [
                'Red',
                'Blue',
                'Yellow'
              ],
              datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
              }]
            },
            options: {
              responsive: true,
              aspectRatio: 2.5,
            },
          });

          // ee.shift(chart)
          ee['chart'] = this.chart

          console.log(ee);
          
          

          // this.newChartArray.push(chart)

        })
        
      });


      // Destroys a specific chart instance
      // this.chart.destroy();



      // res.data.data.map((sect: any) => {
      //   // console.log(sect);
        
      //   // sect.SectionQuestions.map((quest: any) => {
      //   //   if(quest.type === 'radio') {
      //   //     // quest.responses.forEach((h: any) => {
      //   //     //   console.log(h);
              
      //   //     // })
      //   //     console.log(quest.responses);
      //   //   }

      //   //   // let resData = quest.responses
      //   //   // let resLabel = quest.options
      //   //   // let resType = quest.type
      //   //   // let resKey = quest.questKey
      //   //   // // console.log(resData);
      //   //   // this.renderChart(resLabel, resData, resType, resKey)
          
      //   // })
      // })
      // res.data.docs.forEach((element: any) => {
      //   element.questions.forEach((element1: any) => {
      //     // console.log(element1);
      //     element1.responses.forEach((element2: any) => {
      //       // console.log(element2);
      //     });
      //   });
      // });
    });
  }

  renderChart(labelData: any, mainData: any, type: any, id: any) {
    new Chart('first', {
      type: 'pie',
      data: {
        // values on X-Axis
        labels: labelData,
        datasets: [
          {
            label: 'Sales',
            data: mainData,
            backgroundColor: 'blue',
          },
          // {
          //   label: 'Profit',
          //   data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
          //   backgroundColor: 'limegreen',
          // },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
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
