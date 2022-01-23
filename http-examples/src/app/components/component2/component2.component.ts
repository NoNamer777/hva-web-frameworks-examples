import { Component, OnInit } from '@angular/core';
import {Country} from '../../model/country';
import {CountryService} from '../../services/country.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component implements OnInit {

  currency: any;
  countries: Country[] = [];
  errorMessage: any;

  constructor(private currencyService: CountryService) { }

  ngOnInit() {
  }

  onShowCountries() {
    this.currencyService.getCountriesByCurrency(this.currency).subscribe(
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
