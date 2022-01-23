import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.css']
})
export class Component3Component implements OnInit, OnDestroy {

  myParam: any;

  constructor(private route: ActivatedRoute ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.myParam = params.myparam;
      });
    }

  ngOnDestroy(): void {
    console.log('destroyed');
  }

}
