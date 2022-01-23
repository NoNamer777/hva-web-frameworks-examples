import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Stock} from '../model/stock';
import {StockService} from '../services/stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: 'stock-list.component.html',
})
export class StockListComponent implements AfterViewInit {
  marketOpen = false;
  marketName = 'AEX Index';
  symbol: string;
  selectedStock: Stock;
  @ViewChild('symbolElement', {static:false}) symbolReference: ElementRef;

  constructor(private stockService: StockService) {
    // changing the market status after few seconds
    setTimeout( () => {
      this.marketOpen = true;
    }, 5000);
  }

  get marketStatus(): string {
    return this.marketOpen ? 'Open' : 'Closed';
  }

  addSymbol(): void {
    if (this.symbol != null && this.symbol.trim() !== '') {
      const stock = new Stock(this.symbol);
      this.stockService.updateStock(stock);
      this.symbol = '';
      this.onSelect(stock);
    }
  }

  onUpdateSymbol(event: Event): void {
    console.log(event);
  }

  onSelect(stock: Stock): void {
    this.selectedStock = Stock.trueCopy(stock);
  }

  onStockUpdated(stock: Stock): void {
    this.stockService.updateStock(stock);
  }

  ngAfterViewInit(): void {
    this.symbolReference.nativeElement.focus();
  }

  get listSize() {
    return this.stockService.listSize;
  }

  get stockList() {
    return this.stockService.allStocks;
  }

}
