import { Component } from '@angular/core';

interface Country {
  Country: string;
  TotalConfirmed: number | string;
  TotalRecovered: number | string;
  TotalDeaths: number | string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'freterapido-challenge';

  countries: Country[];

  constructor() {
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
    }))
  }


}
