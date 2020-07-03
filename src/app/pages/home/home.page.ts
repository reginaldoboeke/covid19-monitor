import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Country {
  Country: string;
  TotalConfirmed: number | string;
  TotalRecovered: number | string;
  TotalDeaths: number | string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  title = 'freterapido-challenge';

  countries: Country[];

  constructor(private router: Router) {
    this.countries = [
      {
        Country: 'Brasil',
        TotalConfirmed: 111453,
        TotalRecovered: 34562,
        TotalDeaths: 43532,
      },
      {
        Country: 'Brasil',
        TotalConfirmed: 111453,
        TotalRecovered: 34562,
        TotalDeaths: 43532,
      },
      {
        Country: 'Brasil',
        TotalConfirmed: 111453,
        TotalRecovered: 34562,
        TotalDeaths: 43532,
      },
      {
        Country: 'Brasil',
        TotalConfirmed: 111453,
        TotalRecovered: 34562,
        TotalDeaths: 43532,
      },
      {
        Country: 'Brasil',
        TotalConfirmed: 111453,
        TotalRecovered: 34562,
        TotalDeaths: 43532,
      },
    ];

    this.countries = this.countries.map(country => ({
      ...country,
      TotalConfirmed: country.TotalConfirmed.toLocaleString(),
      TotalRecovered: country.TotalRecovered.toLocaleString(),
      TotalDeaths: country.TotalDeaths.toLocaleString(),
    }));
  }

  handleGoToDetails(country: Country) {
    this.router.navigate(['/details'], {
      queryParams: {
        country: JSON.stringify(country)
      },
    });
  }
}
