import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';

import { CountryStatistics } from 'src/app/models/country.model';
import { GlobalStatistics } from 'src/app/models/global.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  confirmedColor = '#F54E70';
  recoveredColor = '#6FD408';
  deathsColor = '#9476FF';

  countriesFilter = [
    { countrySlug: 'brazil', countryCode: 'BR' },
    { countrySlug: 'portugal', countryCode: 'PT' },
    { countrySlug: 'germany', countryCode: 'DE' },
    { countrySlug: 'italy', countryCode: 'IT' },
    { countrySlug: 'spain', countryCode: 'ES' },
  ];

  countries: CountryStatistics[] = [];
  globalStatistics: GlobalStatistics;
  dateInUse: Date;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private dataService: DataService,
  ) { }

  async ngOnInit(): Promise<void> {
    const date = new Date();
    const dateFormatted = this.datePipe.transform(date, 'yyyy-MM-dd');

    this.globalStatistics = await this.dataService.getCurrentWorldStatistic();

    this.getCountriesStatisticsByDate(dateFormatted, true);
  }

  async getCountriesStatisticsByDate(date: string, firstLoad?: boolean) {
    const [year, month, day] = date.split('-').map(Number);
    this.dateInUse = new Date(year, month - 1, day);

    const fromDate = new Date(year, month - 1, day);
    const toDate = new Date(year, month - 1, day + 1)

    fromDate.setUTCHours(0);
    toDate.setUTCHours(0);

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
        }),
    ));

    if (!firstLoad) this.toastr.success(null, 'Dados atualizados!');
  }

  handleGoToDetails(country: CountryStatistics): void {
    const [{ countrySlug }] = this.countriesFilter.filter(
      countryItem => countryItem.countryCode === country.CountryCode
    );

    this.router.navigate(['/details'], {
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
}
