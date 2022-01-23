import { Component, OnInit } from '@angular/core';
import {Country} from '../../model/country';
import {CustomCountry} from '../../model/custom-country';
import {CountryService} from '../../services/country.service';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.css']
})
export class Component3Component implements OnInit {

  countryName: any;
  countries: CustomCountry[] = [];
  errorMessage: any = null;
  fulltextSearch: any;

  constructor(private countryService: CountryService) { }

  ngOnInit() {
  }

  onShowCountries() {
    this.countryService.getCountriesSummary(this.countryName, this.fulltextSearch).subscribe(
      (data) => {
        this.countries = data;
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
