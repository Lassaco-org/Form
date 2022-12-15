import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormService } from 'src/app/shared/services/form.service';
import { AdminService } from '../../services/admin.service';
declare var google: any


@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  user: any;

  responses: any = [
      {
      "name": "Does your organisation have board of trustees?",
      "type": "radio",
      "orderedNo": 1,
      "questKey": 1,
      "numberOfResponses": 2,
      "responses": [
              { option: "Yes", value: 5},
              { option: "No", value: 4},
      ]
      
      },
      {
      "name": "Number of partime?",
      "type": "text",
      "orderedNo": 2,
      "questKey": 2,
      "responses": [
        {value: "34"},
        {value: "20"},
        {value: "10"},
        {value: "40"},
      ]
      },
      {
      "name": "Size of organization?",
      "type": "checkbox",
      "orderedNo": 3,
      "questKey": 3,
      "responses": [
              { option: "1-5", value: 3},
              { option: "6-10", value: 6},
              { option: "11-20", value: 4},
              { option: "21-50", value: 3},
              { option: "51-100", value: 2},
              { option: "100+", value: 1}
          ]
      },
  ]
  surveys: any;
  admins: any;
  constructor(
    private authService: AuthService, 
    private formService: FormService, 
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    // Get user details
    let userData = this.authService.getUserFromLocalStorage();
    this.user = userData.user;

    // Get Surveys
    this.getSurveys()

    // Load Charts and the corechart and barchart packages.
    google.charts.load('current', { packages: ['corechart'] });

    this.getResponses()
    this.getAdmins()
  }

  getResponses() {
    this.responses.forEach((resp: any, index: any) => {
      if(resp.type === 'radio') {
        this.buildChart(resp.responses, index, 'radio')
      } else if (resp.type === 'checkbox') {
        this.buildChart(resp.responses, index, 'checkbox') 
      }
    })
  }

  // Get surveys
  getSurveys() {
    this.formService
      .getForms()
      .subscribe({
        next: (res: any) => {
          this.surveys = res.data.docs;
          
        },
        error: (e) => console.error(e),
      });
  }

  // Get surveys
  getAdmins() {
    this.adminService
      .getAdmins()
      .subscribe({
        next: (res: any) => {
          this.admins = res.data.docs;
        },
        error: (e) => console.error(e),
      });
  }

  buildChart(activities: any, index: any, type: any) {
    let id = `chart-${index}` 
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'count');
      activities.forEach((item: any) => {
        data.addRows([
          [item.option, item.value]
        ]);
      });
      var options = {
        width: 500,
        height: 400,
        tooltip: { textStyle: { fontName: 'verdana', fontSize: 17 } }
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
}
