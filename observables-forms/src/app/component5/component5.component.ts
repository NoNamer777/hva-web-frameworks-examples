import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-component5',
  templateUrl: './component5.component.html',
  styleUrls: ['./component5.component.css']
})
export class Component5Component implements OnInit {

  @ViewChild('f')
  myForm: any;
  quiz = { title: '', category: 'HIS', description: '', email: ''};

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.myForm);
    this.myForm.reset();
  }

}
