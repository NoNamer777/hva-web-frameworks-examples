import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Country} from '../model/country';
import {Injectable} from '@angular/core';
import {CustomCountry} from '../model/custom-country';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) {}

  getCountriesByCurrency(currency: string): Observable<Country[]> {

    const url = `https://restcountries.com/v2/currency/${currency}`;
    return this.httpClient.get<Country[]>(url)
          .pipe(map( content => {
              if ('status' in content) {
                const error: any = content
                throw new HttpErrorResponse( {
                  error: error['message'],
                  status: error['status'],
                });
              } else {
                return content;
              }
          }),
            catchError(this.handleError));
  }

  /**
   * An example of data transformation. Note that the
   * example is a bit verbose for the sake of understanding.
   * It can be improved with the usage of data.map or adapters
   * but works fine for simple data transformation scenarios
   * @param name
   * @param fulltextSearch
   */
  getCountriesSummary(name: string, fulltextSearch: boolean) {

    const url = `https://restcountries.com/v2/name/${name}`;

    const params = new HttpParams().set('fullText', String(fulltextSearch));

    return this.httpClient.get(url, {'params': params}).pipe(
      map(
        (rawCountries: any) => {

          if ('status' in rawCountries) {
            const error: any = rawCountries
            throw new HttpErrorResponse( {
              error: error['message'],
              status: error['status'],
            });
          }
          // creating an empty list of countries
          const countries: CustomCountry[] = [];

          // iterating over contries
          // @ts-ignore
          for (const rawCountry of rawCountries) {

            // creating a new country
            const country: CustomCountry = new CustomCountry();

            // assigning values
            country.countryName = rawCountry.name;
            country.officialLanguages = '';
            for (const language of rawCountry.languages) {
              country.officialLanguages += language.name + ' ';
            }
            country.officialLanguages = country.officialLanguages.trim();

            // adding to the new list
            countries.push(country);
          }
          return countries;
        }
      ),
      catchError(this.handleError));
  }

  /**
   * Based on angular.io
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    let message:string;
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      message = error.error.message;
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if(error.status === 0) {
        message = 'backend error: status: ' + error.message;
      } else {
        message = 'backend error: status: ' + error.status + ' - ' + error.error;
      }

      console.error(message);
    }
    // return an observable with a user-facing error message
    return throwError(message);
  };

}
