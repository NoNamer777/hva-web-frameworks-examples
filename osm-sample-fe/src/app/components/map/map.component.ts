import { Component, OnInit } from '@angular/core';

import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import {transform} from 'ol/proj';
import {LocationService} from '../../services/location.service';
import {AddressInfo} from '../../model/AddressInfo';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // reference to the map object
  mapObject: any;

  // reference to the view object
  view: View;

  // Search field
  searchString: string;

  // Error message
  errorMessage: string;

  // Address Information reference
  addressInfo: AddressInfo;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {

    this.view = new View({
      center: fromLonLat([4.89365, 52.36371]),
      zoom: 18
    });

    this.mapObject = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          preload: 4,
          source: new OSM()
        })
      ],
      view: this.view
    });

    this.mapObject.on('click', (args) => {
      console.log(args.coordinate);
      const lonlat = transform( args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      const lon = lonlat[0];
      const lat = lonlat[1];

      alert(`lat: ${lat} long: ${lon}`);
    });
  }

  goToLeewenburgCampus() {
    this.goToLocation(52.34571, 4.91616);
  }

  goToAmstelCampus() {
    this.goToLocation(52.35910, 4.90786);
  }

  lookupAddress() {

    this.locationService.getAddressInfo(this.searchString).subscribe(
      (data) => {
        console.log(data);

        if (data) {
          this.addressInfo = data;
          this.goToLocation(data.lat, data.lon);
          this.errorMessage = null;
        } else {
          this.errorMessage = 'Unable to find address';
        }

      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  goToLocation(lat, lon) {
    this.view.animate( { center: fromLonLat([lon, lat]) , duration: 1000 });
  }



}
