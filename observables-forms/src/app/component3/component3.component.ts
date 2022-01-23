import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.css']
})
export class Component3Component implements OnInit, OnDestroy {

  customObservableSubscription: any;

  messages: string[] = [];

  constructor() { }

  ngOnInit() {
    const myObservable = new Observable(
      (observer: Observer<string>) => {
        setTimeout( () => { observer.next('First event'); }, 1000 );
        setTimeout( () => { observer.next('Second event'); }, 2000 );
        setTimeout( () => { observer.error('Error event'); }, 3000 );
        setTimeout( () => { observer.complete(); }, 5000 );
      }
    );

    this.customObservableSubscription = myObservable.subscribe(
      (data: string) => {
        this.messages.push('next: ' + data);
      },
      (err: string) => {
        this.messages.push('error: ' + err);
      },
      () => {
        this.messages.push('complete');
      }
    );
  }

  ngOnDestroy(): void {
    this.customObservableSubscription.unsubscribe();
  }

}
