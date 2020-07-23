import { Injectable } from '@angular/core';

interface DatePeriod {
  fromDate: Date;
  toDate: Date;
}

@Injectable()
export class DateUtils {

  /**
   * Returns a date range from the date entered
   *
   * @param date Date basis
   * @param periodInDays Period in days to add from the date informed. Default is 1
   *
   * @returns Date Period
   */
  public getDatePeriodByDate(date: string, periodInDays: number = 1): DatePeriod {
    const [year, month, day] = date.split('-').map(Number);

    const fromDate = new Date(year, month - 1, day);
    const toDate = new Date(year, month - 1, day + periodInDays);

    fromDate.setUTCHours(0);
    toDate.setUTCHours(0);

    return { fromDate, toDate };
  }
}
