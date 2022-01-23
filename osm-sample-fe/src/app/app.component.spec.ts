import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {routes} from './app-routing.module';


describe('AppComponent', () => {

  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  }));

  it('Example 07: should go to the map visualisation', fakeAsync(() => {
    router.navigate(['map']);
    tick();
    expect(location.path()).toBe('/map');
  }));

});
