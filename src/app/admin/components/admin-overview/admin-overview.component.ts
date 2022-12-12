import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  user: any;
  chart: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get user details
    let userData = this.authService.getUserFromLocalStorage();
    this.user = userData.user;

    this.createChart();
  }

  createChart() {
    this.chart = new Chart('chart1', {
      type: 'bar',
      data: {
        // values on X-Axis
        // labels: [
        //   '2022-05-10',
        //   '2022-05-11',
        //   '2022-05-12',
        //   '2022-05-13',
        //   '2022-05-14',
        //   '2022-05-15',
        //   '2022-05-16',
        //   '2022-05-17',
        // ],
        // datasets: [
        //   {
        //     label: 'Yes',
        //     data: ['4'],
        //     backgroundColor: 'blue',
        //   },
        //   {
        //     label: 'No',
        //     data: ['5'],
        //     backgroundColor: 'limegreen',
        //   },
        // ],

        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
          // axis: 'y',
          label: 'My First Dataset',
          data: [65, 59, 80],
          // fill: false,
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      },
    });


    this.chart = new Chart('chart2', {
      type: 'pie',
      data: {
        // values on X-Axis
        // labels: [
        //   'Yes',
        //   'No',
        // ],
        // datasets: [
        //   {
        //     label: 'Yes',
        //     data: ['4'],
        //     backgroundColor: 'blue',
        //   },
        //   {
        //     label: 'No',
        //     data: ['5'],
        //     backgroundColor: 'limegreen',
        //   },
        // ],

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
  }
}
