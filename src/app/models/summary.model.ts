import { GlobalStatistics } from './global.model';
import { CountryStatistics } from './country.model';

export class Summary {
  Global: GlobalStatistics;
  Countries: CountryStatistics[];
  Date: Date;
}
