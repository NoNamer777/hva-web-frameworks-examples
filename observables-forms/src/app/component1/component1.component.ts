import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit, OnDestroy {

  savedParam: any;

  constructor(private route: ActivatedRoute) {
    console.log('Component 1: created');
  }

  ngOnInit() {
    this.route.params.subscribe(
      (pars: Params) => {
        console.log('Component 1: parameter changed');
        this.savedParam = pars.subpath;
      });
  }

  ngOnDestroy(): void {
    console.log('Component 1: destroyed');
  }

}
