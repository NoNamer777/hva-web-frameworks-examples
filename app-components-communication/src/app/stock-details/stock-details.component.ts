import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stock} from '../model/stock';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  @Input('inputElement')
  element: Stock;

  @Output()
  stockUpdated = new EventEmitter<Stock>();

  constructor() {

  }

  ngOnInit() {
  }

  onUpdateStock() {
    this.stockUpdated.emit(this.element);
  }

}
