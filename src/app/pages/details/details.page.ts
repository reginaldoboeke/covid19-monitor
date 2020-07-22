import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { CountryStatistics } from 'src/app/models/country.model';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { DateUtils } from 'src/app/utils/date.utils';

interface UpdateChartData {
  confirmed: number;
  recovered: number;
  deaths: number;
}

@Component({
  selector: 'app-details-page',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  providers: [DateUtils],
})
export class DetailsPage implements OnInit {

  public pieChartOptions: ChartOptions = {
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

  public pieChartLabels: Label[] = ['Confirmed', 'Recovered', 'Deaths'];
  public pieChartData: number[] = [0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [{ backgroundColor: ['#F54E70', '#6FD408', '#9476FF'] }];

  public country: CountryStatistics = {} as CountryStatistics;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private dateUtils: DateUtils,
    private toastr: ToastrService,
    private dataService: DataService,
  ) { }

  public ngOnInit(): void {
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

  public async getCountryStatisticsByDate(date: string) {
    const { fromDate, toDate } = this.dateUtils.getDatePeriodByDate(date);

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

    this.toastr.success(null, 'Data has been updated!');
  }

  public updateChartData({ confirmed, recovered, deaths }: UpdateChartData) {
    this.pieChartData = [confirmed, recovered, deaths];
  }
}
