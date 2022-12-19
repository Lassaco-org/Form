import { Component, HostListener, OnInit } from '@angular/core';
import { ResponseService } from 'src/app/shared/services/response.service';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { ExcelService } from 'src/app/admin/services/excel.service';
import { HttpClient } from '@angular/common/http';
declare var google: any

@Component({
  selector: 'app-display-survey-responses',
  templateUrl: './display-survey-responses.component.html',
  styleUrls: ['./display-survey-responses.component.scss'],
})
export class DisplaySurveyResponsesComponent implements OnInit {
  isAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isShareModal: boolean = false;
  formId: string = '';
  dataLoading: boolean = true;
  currentShortCode: any;
  survey: any;
  surveyQuestions: any
  windowScrolled: boolean = false;
  deleteModal: boolean = false;

  constructor(
    private responseService: ResponseService,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
  ) {}

  // When user scroll 300 away from the top of the document
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      this.windowScrolled = true;
    }
    else {
      this.windowScrolled = false;
    }
  }

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
          this.responseService.getResponseStats(this.survey._id).subscribe({
            next: (res: any) => {
              this.surveyQuestions = res.data;
              // Bind question responses
              if(this.surveyQuestions.totalResponses > 0) {
                this.surveyQuestions.data.forEach((quest: any, index: any) => {
                  // create chart row Data
                  let resKey: any = Object.keys(quest.responses)
                  let chartData: any = []
                  Object.keys(resKey).forEach( function(key) {
                    chartData.push({option: resKey[key], value: quest.responses[resKey[key]]})
                  })
  
                  // Load Charts and the corechart and barchart packages.
                  google.charts.load('current', { packages: ['corechart'] });
                  
                  // Build chart
                  if(quest.type === 'radio') {
                    this.buildChart(chartData, index, 'radio')
                  } else if (quest.type === 'checkbox') {
                    this.buildChart(chartData, index, 'checkbox') 
                  }
                })
              }
              

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

  // Build chart
  buildChart(responses: any, index: any, type: any) {
    let id = `chart-${index}` 
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'count');
      responses.forEach((item: any) => {
        data.addRows([
          [item.option, item.value]
        ]);
      });
      var options = {
        width: 600,
        height: 300,
        tooltip: { textStyle: { fontName: 'DM Sans', fontSize: 17 } }
      };
      chart().draw(data, options);
    }
    if(type == 'radio') {
      var chart = () => new google.visualization.PieChart(document.getElementById(id));
    } else if (type === 'checkbox') {
      var chart = () => new google.visualization.BarChart(document.getElementById(id));
    }
    var callback = () => func(chart);

    // Draw the pie chart and bar chart when Charts is loaded
    google.charts.setOnLoadCallback(callback);
  }

  // Download responses 
  downloadAsExcel() {
    console.log(this.survey._id);
    this.responseService
      .downloadResponses(this.survey._id)
      
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (e) => console.error(e),
      });
  }

  // Clear responses 
  clearResponses() {
    this.responseService
      .clearResponses(this.survey._id)
      .subscribe({
        next: (res: any) => {
          if(res.message === "Responses cleared successfully") {
            this.showAlert('Respones cleared', 'success')
            this.ngOnInit()
            this.closeDeleteModal()
          }
        },
        error: (e) => console.error(e),
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

  // Close delete modal
  openDeleteModal() {
    this.deleteModal = true
  }

  // Close delete modal
  closeDeleteModal() {
    this.deleteModal = false
  } 

  // Show alert
  showAlert(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }

  // Scroll Up
  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
