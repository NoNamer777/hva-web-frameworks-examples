import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MapComponent } from './map.component';
import {FormsModule} from '@angular/forms';
import {LocationService} from '../../services/location.service';
import {HttpClientModule} from '@angular/common/http';
import {of} from 'rxjs';

describe('MapComponent', () => {
  let component: MapComponent;
  let componentHtml: HTMLElement;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      imports: [HttpClientModule, FormsModule  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  /**
   * Example of an integration test. Note that the component is using the real service.
   */
  it( 'Example 01: search input should update component property)',  () => {

    // Arrange (getting UI components)
    const searchInput: HTMLInputElement = componentHtml.querySelector('#searchString');
    const searchButton: HTMLButtonElement = componentHtml.querySelector('#searchButton');

    // Act: Performing search
    searchInput.value = 'Wibautstraat, 2, Amsterdam';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // Angular should be updated

    // Assert: Check if the property was updated
    expect(component.searchString).toEqual(searchInput.value);
  });


  /**
   * Example of an integration test. Note that the component is using the real service.
   */
  it( 'Example 02: should go to the right address (test with asynchronous call and validating DOM elements)',  (done) => {

    // Arrange (getting UI components)
    const searchInput: HTMLInputElement = componentHtml.querySelector('#searchString');
    const searchButton: HTMLButtonElement = componentHtml.querySelector('#searchButton');

    // Act: Performing search
    searchInput.value = 'Wibautstraat, 2, Amsterdam';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // Angular should be updated
    expect(component.searchString).toEqual(searchInput.value);

    const locationService = fixture.debugElement.injector.get(LocationService);
    const spy = spyOn(locationService, 'getAddressInfo').and.callThrough();

    searchButton.click();

    fixture.detectChanges(); // Angular should be updated

    // Assert: checking if the UI was updated, showing address information
    spy.calls.mostRecent().returnValue.subscribe(() => {
      fixture.detectChanges();
      const resultDiv: HTMLDivElement = componentHtml.querySelector('#searchResult');
      expect(resultDiv.innerText).toContain('Address Information');
      expect(resultDiv.innerText).toContain('Street: Wibautstraat');
      done();
    });
  });

  /**
   * Example of an integration test. Note that the component is using the real service.
   */
  it( 'Example 03: should go to the right address (test with asynchronous call)',  (done) => {

    // Arrange

    // getting UI components
    const searchInput: HTMLInputElement = componentHtml.querySelector('#searchString');
    const searchButton: HTMLButtonElement = componentHtml.querySelector('#searchButton');

    // creating a spy to intercept calls to the service
    const locationService = fixture.debugElement.injector.get(LocationService);
    const spy = spyOn(locationService, 'getAddressInfo').and.callThrough();

    // Act: Performing search
    searchInput.value = 'Wibautstraat, 2, Amsterdam';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // Angular should be updated
    searchButton.click();
    fixture.detectChanges(); // Angular should be updated

    // Assert: checking if the address info object was updated
    spy.calls.mostRecent().returnValue.subscribe(() => {
      expect(component.addressInfo.city).toBe('Amsterdam');
      expect(component.addressInfo.lat).toBe(52.3592795);
      expect(component.addressInfo.lon).toBe(4.9087295);
      done();
    });
  });

  /**
   * Example of mocking a service using a spy
   */
  it( 'Example 04: should go to the right address (mocking a service with a spy)',  (done) => {

    // Arrange
    // getting UI components
    const searchInput: HTMLInputElement = componentHtml.querySelector('#searchString');
    const searchButton: HTMLButtonElement = componentHtml.querySelector('#searchButton');

    // Creating a spy to intecept calls and return a dummy object
    const locationService = fixture.debugElement.injector.get(LocationService);
    const spy = spyOn(locationService, 'getAddressInfo').and.returnValue( of({ city: 'Amsterdam', lat: 52.3592795, lon: 4.9087295}));

    // Act: Performing search
    searchInput.value = 'Wibautstraat, 2, Amsterdam';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // Angular should be updated
    searchButton.click();

    fixture.detectChanges(); // Angular should be updated

    // Assert: checking if the address info object was updated
    spy.calls.mostRecent().returnValue.subscribe(() => {
      expect(component.addressInfo.city).toBe('Amsterdam');
      expect(component.addressInfo.lat).toBe(52.3592795);
      expect(component.addressInfo.lon).toBe(4.9087295);
      done();
    });
  });

});
