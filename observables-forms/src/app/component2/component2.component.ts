import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component implements OnInit, OnDestroy {

  nr: any = undefined;
  numbersSubscription: any;

  constructor() { }

  ngOnInit() {

    const myNumbers = interval(1000);
    this.numbersSubscription = myNumbers.subscribe(
      (n: number) => {
        this.nr = n;
      }
    );
  }

  ngOnDestroy(): void {
    this.numbersSubscription.unsubscribe();
  }

}
