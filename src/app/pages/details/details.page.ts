import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-details-page',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    layout: {
      padding: {
        top: 50,
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
    aspectRatio: 1.5,
  };

  pieChartLabels: Label[] = ['Infectados', 'Curados', 'Mortes'];
  pieChartData: number[] = [300, 500, 100];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [{
    backgroundColor: ['#F54E70', '#6FD408', '#9476FF'],
  }];

  constructor() { }

  ngOnInit(): void { }

  handleChangeData() {
    this.pieChartData = [500, 100, 300];
  }

  handleGetData(date?: Date) {
    console.log('handleGetData', date);
  }

  handleRefresh() {
    console.log('handleRefresh');
  }

}
