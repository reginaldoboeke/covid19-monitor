import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { DataService } from 'src/app/modules/main/services/data.service';

import { CountryStatistics } from 'src/app/core/models/country-statistics.model';
import { TotalStatistics } from 'src/app/core/models/total-statistics.model';

import { DateUtils } from 'src/app/shared/utils/date.utils';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [DateUtils],
})
export class HomePage implements OnInit {

  private dateInUse: Date;
  private countriesFilter = [
    { countrySlug: 'brazil', countryCode: 'BR' },
    { countrySlug: 'portugal', countryCode: 'PT' },
    { countrySlug: 'germany', countryCode: 'DE' },
    { countrySlug: 'italy', countryCode: 'IT' },
    { countrySlug: 'spain', countryCode: 'ES' },
  ];

  public confirmedColor = '#F54E70';
  public recoveredColor = '#6FD408';
  public deathsColor = '#9476FF';

  public countries: CountryStatistics[] = [];
  public totalStatistics: TotalStatistics = {} as TotalStatistics;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private dateUtils: DateUtils,
    private toastr: ToastrService,
    private dataService: DataService,
  ) { }

  public async ngOnInit(): Promise<void> {
    const date = new Date();
    const dateFormatted = this.datePipe.transform(date, 'yyyy-MM-dd');

    this.getCountriesStatisticsByDate(dateFormatted, true);
  }

  public async getCountriesStatisticsByDate(date: string, firstLoad?: boolean) {
    const [year, month, day] = date.split('-').map(Number);
    this.dateInUse = new Date(year, month - 1, day);

    const { fromDate, toDate } = this.dateUtils.getDatePeriodByDate(date);

    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    if (date === currentDate) {
      fromDate.setDate(fromDate.getDate() - 1);
      toDate.setDate(toDate.getDate() - 1);
    }

    await Promise.all(this.countriesFilter.map(({ countrySlug }) =>
      this.dataService.getCountryStatisticsByDate({
        countrySlug,
        fromDate,
        toDate,
      })
        .then(([responseCountry]) => {
          const countryIndex = this.countries.findIndex(
            country => country.CountryCode === responseCountry.CountryCode
          );

          if (countryIndex >= 0) {
            this.countries[countryIndex] = responseCountry;
            return;
          }

          this.countries.push(responseCountry);
        })
        .catch((error) => {
          console.error(error);
          this.toastr.error(
            'Please refresh the page', 'Problems fetching country data',
          );
        }),
    ));

    this.calculateTotalStatistics();

    if (!firstLoad) this.toastr.success(null, 'Data has been updated!');
  }

  public handleGoToDetails(country: CountryStatistics): void {
    const [{ countrySlug }] = this.countriesFilter.filter(
      countryItem => countryItem.countryCode === country.CountryCode
    );

    this.router.navigate(['/main/details'], {
      queryParams: {
        Country: country.Country,
        Deaths: country.Deaths,
        Confirmed: country.Confirmed,
        Recovered: country.Recovered,
        Date: this.dateInUse.toISOString(),
        Slug: countrySlug,
      },
    });
  }

  /**
   * Totaling the statistics present in the table
   */
  private calculateTotalStatistics(): void {
    const totalStatistics = this.countries.reduce((accumulator, country): TotalStatistics => ({
      TotalConfirmed: (accumulator.TotalConfirmed || 0) + country.Confirmed,
      TotalRecovered: (accumulator.TotalRecovered || 0) + country.Recovered,
      TotalDeaths: (accumulator.TotalDeaths || 0) + country.Deaths,
    }), {} as TotalStatistics);

    this.totalStatistics = Object.assign(this.totalStatistics, totalStatistics);
  }
}
