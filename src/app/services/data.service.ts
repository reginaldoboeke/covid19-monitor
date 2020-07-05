import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Summary } from '../models/summary.model';


@Injectable({
  providedIn: 'root',
})
export class DataService {

  private baseURL = 'https://api.covid19api.com';

  constructor(private http: HttpClient) { }

  getSummary() {
    return this.http
      .get<Summary>(`${this.baseURL}/summary`)
      .toPromise();
  }
}

