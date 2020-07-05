import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';

import { CountryStatistics } from 'src/app/models/country.model';
import { GlobalStatistics } from 'src/app/models/global.model';

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
    'brazil', 'portugal', 'germany', 'italy', 'united-states',
  ];

  countries: CountryStatistics[];
  globalStatistics: GlobalStatistics;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.loadSummary();
  }

  async loadSummary(): Promise<void> {
    const summary = await this.dataService.getSummary();

    this.globalStatistics = summary.Global;

    this.countries = summary.Countries
      .filter(country => this.countriesFilter.includes(country.Slug));
  }

  async getDataByDate(date: Date) {
    console.log('date is: ', date);
  }

  handleGoToDetails(country: CountryStatistics): void {
    this.router.navigate(['/details'], {
      queryParams: { country: JSON.stringify(country) }
    });
  }
}
