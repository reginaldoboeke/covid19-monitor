import { TotalStatistics } from './total-statistics.model';
import { CountryStatistics } from './country-statistics.model';

export class Summary {
  public Total: TotalStatistics;
  public Countries: CountryStatistics[];
  public Date: Date;
}
