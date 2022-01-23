import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() balanceParam = 0;
  @Output() balanceParamChange = new EventEmitter(); // the magic here is that the output should have the same name of the input + the suffix "Change"

  constructor() { }

  ngOnInit(): void {
  }

  withdraw(): void {
    this.balanceParam -= 10;
    this.balanceParamChange.emit(this.balanceParam); // you should emit an event t be captured by the parent
  }

}
