import { TotalStatistics } from './global.model';
import { CountryStatistics } from './country.model';

export class Summary {
  public Total: TotalStatistics;
  public Countries: CountryStatistics[];
  public Date: Date;
}
