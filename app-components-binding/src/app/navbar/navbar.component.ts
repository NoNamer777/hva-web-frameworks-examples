import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  markets: Market = []
  selectedMarket = {};

  constructor() {
    this.markets = [
      {id: 1, name: 'AEX'},
      {id: 2, name: 'CAC40'},
      {id: 3, name: 'NYSE'}
    ]
  }

  ngOnInit() {
  }

}

interface Market {
  id: number,
  name: string
}
