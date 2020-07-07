import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { CountryStatistics } from 'src/app/models/country.model';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

interface UpdateChartData {
  confirmed: number;
  recovered: number;
  deaths: number;
}

@Component({
  selector: 'app-details-page',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'top' },
    layout: {
      padding: { top: 50 },
    },
    plugins: {
      datalabels: {
        formatter: (_, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
    aspectRatio: 1.5,
  };

  pieChartLabels: Label[] = ['Infectados', 'Curados', 'Mortes'];
  pieChartData: number[] = [0, 0, 0];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [{ backgroundColor: ['#F54E70', '#6FD408', '#9476FF'] }];

  country: CountryStatistics = {} as CountryStatistics;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    const {
      Country,
      Confirmed,
      Deaths,
      Recovered,
      Date,
      Slug,
    } = this.route.snapshot.queryParams;

    this.country.Country = Country;
    this.country.Confirmed = Confirmed;
    this.country.Deaths = Deaths;
    this.country.Recovered = Recovered;
    this.country.Date = Date;
    this.country.Slug = Slug;

    this.updateChartData({
      confirmed: Number(Confirmed),
      recovered: Number(Recovered),
      deaths: Number(Deaths),
    })
  }

  async getCountryStatisticsByDate(date: string) {
    const [year, month, day] = date.split('-').map(Number);

    const fromDate = new Date(year, month - 1, day);
    const toDate = new Date(year, month - 1, day + 1)

    fromDate.setUTCHours(0);
    toDate.setUTCHours(0);

    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    if (date === currentDate) {
      fromDate.setDate(fromDate.getDate() - 1);
      toDate.setDate(toDate.getDate() - 1);
    }

    const [responseCountry] = await this.dataService.getCountryStatisticsByDate({
      countrySlug: this.country.Slug,
      fromDate,
      toDate,
    });

    this.country = Object.assign(this.country, responseCountry);

    this.updateChartData({
      confirmed: this.country.Confirmed,
      recovered: this.country.Recovered,
      deaths: this.country.Deaths,
    });

    this.toastr.success(null, 'Dados atualizados!');
  }

  updateChartData({ confirmed, recovered, deaths }: UpdateChartData) {
    this.pieChartData = [confirmed, recovered, deaths];
  }
}
