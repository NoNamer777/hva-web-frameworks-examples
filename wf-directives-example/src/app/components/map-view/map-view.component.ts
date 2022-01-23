import { Component, OnInit } from '@angular/core';
import { ProvinceService} from '../../services/province.service';
import {Province} from '../../model/province';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  provinces: Province[];
  selectedProvince: Province;

  constructor(private provinceService: ProvinceService) { }

  ngOnInit(): void {
    this.provinces = this.provinceService.getProvinces();
  }

  regionClicked(region): void {
    // TODO 2: Save the selected province. Note that you will only have the name at this point.
    // Use the most suitable method to get a province using the province service.
    this.selectedProvince = this.provinceService.getProvinceByName(region);
  }

}
