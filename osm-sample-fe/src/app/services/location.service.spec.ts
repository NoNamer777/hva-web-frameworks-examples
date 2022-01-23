import {async, getTestBed, TestBed} from '@angular/core/testing';

import { LocationService } from './location.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Test} from 'tslint';
import {AddressInfo} from '../model/AddressInfo';

describe('LocationService', () => {
  let service: LocationService;
  let httpMock: HttpTestingController;



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Example 05: should return a valid address info object', () => {

    const dummyData = [
                        {
                          lat: 52.3592795,
                          lon: 4.9087295,
                          address: {
                            house_number: '2',
                            road: 'Wibautstraat',
                            city: 'Amsterdam',
                            country: 'The Netherlands',
                          }
                        }
                      ];

    service.getAddressInfo('Wibautstraat, 2, Amsterdam').subscribe( (res: AddressInfo) => {
      expect(res.city).toEqual('Amsterdam');
      expect(res.lat).toEqual(52.3592795);
      expect(res.lon).toEqual(4.9087295);
    });

    const req = httpMock.expectOne(
      'https://nominatim.openstreetmap.org/?addressdetails=1&q=Wibautstraat, 2, Amsterdam&format=json&limit=1');
    expect(req.request.method).toBe('GET');

    req.flush(dummyData);
  });

  it('Example 06: should generate an exception due to wrong argument', () => {

    const dummyData = [];

    service.getAddressInfo('Non-existing address, 2, Amsterdam').subscribe( (res: AddressInfo) => {}, (err) => {
      expect(err).toBeTruthy();
    });

    const req = httpMock.expectOne(
      'https://nominatim.openstreetmap.org/?addressdetails=1&q=Non-existing address, 2, Amsterdam&format=json&limit=1');
    expect(req.request.method).toBe('GET');

    req.flush({
        type: 'ERROR',
        status: 400
      });
  });
});
