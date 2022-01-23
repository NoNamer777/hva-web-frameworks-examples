import { Injectable } from '@angular/core';
import {Stock} from '../model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stockMap: Map<string, Stock> = new Map<string, Stock>();

  constructor() {
    this.populateStock();
  }

  populateStock() {
    this.stockMap.set('ABN', new Stock('ABN'));
    this.stockMap.set('UNA', new Stock('UNA'));
    this.stockMap.set('AAPL', new Stock('AAPL'));
  }

  get allStocks() {
    return Array.from( this.stockMap.values() );
  }

  get listSize() {
    return this.stockMap.size;
  }

  getStockByAcronym(acronym: string) {
    return this.stockMap.get(acronym);
  }

  updateStock(stock: Stock) {
    this.stockMap.set(stock.id, stock);
  }

}
