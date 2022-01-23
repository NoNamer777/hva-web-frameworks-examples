import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../services/location.service';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import {OSM, Vector as VectorSource} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {Vector as VectorLayer} from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style, Text} from 'ol/style';
import 'ol/ol.css';

@Component({
  selector: 'app-geojson-layer',
  templateUrl: './geojson-layer.component.html',
  styleUrls: ['./geojson-layer.component.css']
})
export class GeojsonLayerComponent implements OnInit {

  // reference to the map object
  mapObject: any;

  // reference to the view object
  view: View;

  // Error message
  errorMessage: string;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {

      // A vector layer with the neighboorhood of Amsterdam
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: 'http://localhost:4200/assets/neighboorhood.json' // this is a copy of open data provided by the Gemeente of Amsterdam
        }),
        style: this.getStyle
      });

      // A view centering the map in the middle of Amsterdam
      this.view = new View({
        center: fromLonLat([4.90701, 52.371412]),
        zoom: 14
      });

      // A mapobject with two layers
      this.mapObject = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            preload: 4,
            source: new OSM()
          }),
          vectorLayer
        ],
        view: this.view
      });
  }

  // Styles can be controlled based on the feature data.
  getStyle(feature) {
    const style = new Style({
      text: new Text({
        font: 'bold 15px "Open Sans", "Arial Unicode MS", "sans-serif"',
        placement: 'center',
        fill: new Fill({color: 'red'})
      }),
      stroke: new Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    });

    style.getText().setText(feature.get('Gebied'));

    // Using a different color for the neighboorhood of Hva AmstelCampus (Oud-Oost)
    if ( feature.get('Gebied') === 'Oud-Oost' ) {
      style.setFill(new Fill( {color: 'rgba(0, 0, 255, 0.3)'} ));
    }

    return style;

  }

}
