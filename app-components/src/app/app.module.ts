import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StockListComponent} from "./stock-list/stock-list.component";
import {StockDetailsComponent} from "./stock-details/stock-details.component";
import {StockChartComponent} from "./stock-chart/stock-chart.component";
import {NavbarComponent} from "./navbar/navbar.component";

@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    StockDetailsComponent,
    StockChartComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
