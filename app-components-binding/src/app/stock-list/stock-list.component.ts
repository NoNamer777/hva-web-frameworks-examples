import {Component} from '@angular/core';
import {Stock} from '../model/stock';

@Component({
  selector: 'app-stock-list',
  templateUrl: 'stock-list.component.html'
})
export class StockListComponent {
  marketOpen = false;
  marketName = 'AEX Index';
  marketLogo = 'https://live.euronext.com/themes/custom/euronext_live/logo.svg';
  stockList: Stock[] = [];
  symbol: string = '';
  currentId: string;

  constructor() {
    // adding some items
    this.stockList.push(new Stock('ABN'));
    this.stockList.push(new Stock('UNA'));

    // changing the market status after few seconds
    setTimeout( () => {
      this.marketOpen = true;
    }, 2000);
  }

  getMarketStatus(): string {
    return this.marketOpen ? 'Open' : 'Closed';
  }

  addSymbol() {
    if (this.symbol != null && this.symbol.trim() !== '') {
      const stock = new Stock(this.symbol);
      this.stockList.push(stock);
      this.symbol = '';
    }
  }

  setCurrentId(id) {
    this.currentId = id;
  }

  onUpdateSymbol(event: Event) {
    console.log(event);
  }

}
