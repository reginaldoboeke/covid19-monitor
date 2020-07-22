import { GlobalStatistics } from './global.model';
import { CountryStatistics } from './country.model';

export class Summary {
  public Global: GlobalStatistics;
  public Countries: CountryStatistics[];
  public Date: Date;
}
