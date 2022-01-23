import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AddressInfo} from '../model/AddressInfo';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient ) { }

  getAddressInfo(searchString: string) {

    const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${searchString}&format=json&limit=1`

    return this.httpClient.get(url).pipe(
      map(
        (rawAddresses: any[]) => {

          // creating an empty list of countries
          let addressInfo = null;

          if ( rawAddresses.length > 0 ) {
            addressInfo = new AddressInfo();
            addressInfo.displayName = rawAddresses[0].display_name;
            addressInfo.lat = parseFloat(rawAddresses[0].lat);
            addressInfo.lon = parseFloat(rawAddresses[0].lon);
            addressInfo.houseNumber = rawAddresses[0].address.house_number;
            addressInfo.streetName = rawAddresses[0].address.road;
            addressInfo.city = rawAddresses[0].address.city;
            addressInfo.country = rawAddresses[0].address.country;
            addressInfo.postCode = rawAddresses[0].address.postcode;
          }

          return addressInfo;
        }
      ),
      catchError(this.handleError));
  }

  /**
   * Based on angular.io
   * @param error error
   */
  private handleError(error: HttpErrorResponse) {
    let message: string;
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      message = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if(error.status === 0) {
        message = 'backend error: status: ' + error.message;
      } else {
        message = 'backend error: status: ' + error.status + ' - ' + error.statusText;
      }
    }
    // return an observable with a user-facing error message
    return throwError(message);
  };

}
