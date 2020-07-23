import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { CountryStatistics } from 'src/app/models/country-statistics.model';
import { DataService } from 'src/app/services/data.service';

import { DateUtils } from 'src/app/utils/date.utils';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country.model';

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

  public countries: Country[] = [];
  public country: CountryStatistics = {} as CountryStatistics;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private dateUtils: DateUtils,
    private toastr: ToastrService,
    private dataService: DataService,
  ) { }

  public async ngOnInit(): Promise<void> {
    await this.getCountriesAndSortByName();

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
    });
  }

  public async getCountriesAndSortByName(): Promise<void> {
    const countries = await this.dataService.getCountries();

    this.countries = countries.sort(
      (countryA, countryB) => countryA.Slug.localeCompare(countryB.Slug),
    );
  }

  public async getCountryStatisticsByDate(date: string) {
    const { fromDate, toDate } = this.dateUtils.getDatePeriodByDate(date);

    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    if (date === currentDate) {
      fromDate.setDate(fromDate.getDate() - 1);
      toDate.setDate(toDate.getDate() - 1);
    }

    try {
      const [responseCountry] = await this.dataService.getCountryStatisticsByDate({
        countrySlug: this.country.Slug,
        fromDate,
        toDate,
      });

      if (!responseCountry) {
        this.toastr.warning(
          'Please choose another country.', 'Country data not available', {
            timeOut: 4000,
          },
        );
        return;
      }

      this.country = Object.assign(this.country, responseCountry);

      this.updateChartData({
        confirmed: this.country.Confirmed,
        recovered: this.country.Recovered,
        deaths: this.country.Deaths,
      });

      this.toastr.success(null, 'Data has been updated!');
    } catch (error) {
      this.toastr.error('Please try again', 'Internal server error');
    }
  }

  public updateChartData({ confirmed, recovered, deaths }: UpdateChartData) {
    this.pieChartData = [confirmed, recovered, deaths];
  }
}
