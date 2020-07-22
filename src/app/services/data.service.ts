import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Summary } from '../models/summary.model';
import { CountryStatistics } from '../models/country.model';
import { GlobalStatistics } from '../models/global.model';

interface GetCountryStatisticsByDateDTO {
  countrySlug: string;
  fromDate: Date;
  toDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private baseURL = 'https://api.covid19api.com';

  constructor(private http: HttpClient) { }

  public getSummary(): Promise<Summary> {
    return this.http
      .get<Summary>(`${this.baseURL}/summary`)
      .toPromise();
  }

  public getCurrentWorldStatistic(): Promise<GlobalStatistics> {
    return this.http
      .get<GlobalStatistics>(`${this.baseURL}/world/total`)
      .toPromise();
  }

  public getCountryStatisticsByDate({
    countrySlug,
    fromDate,
    toDate,
  }: GetCountryStatisticsByDateDTO): Promise<CountryStatistics[]> {
    const fromDateString = fromDate.toISOString();
    const toDateString = toDate.toISOString();
    const endpoint = `country/${countrySlug}?from=${fromDateString}&to=${toDateString}`;

    return this.http
      .get<CountryStatistics[]>(`${this.baseURL}/${endpoint}`)
      .toPromise();
  }
}

