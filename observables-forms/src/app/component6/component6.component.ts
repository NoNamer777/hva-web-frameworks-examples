import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Quiz} from './model/quiz';

@Component({
  selector: 'app-component6',
  templateUrl: './component6.component.html',
  styleUrls: ['./component6.component.css']
})
export class Component6Component implements OnInit {

  quizForm: any;
  quiz: Quiz = new Quiz();

  constructor() { }

  ngOnInit() {
    this.quizForm = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl(''),
      description: new FormControl(''),
      owner: new FormControl('', [ Validators.required, Validators.email]),
      tags: new FormArray([])
    });
  }

  onAddTag() {
    const control = new FormControl(null, Validators.required);
    ( this.quizForm.get('tags') as FormArray ).push(control);
    console.log('hi');
  }

  onSubmit() {
    this.form2object();

    this.quizForm.reset();
  }

  private form2object() {
    this.quiz = Object.assign(new Quiz(), this.quizForm.value);
    this.quizForm.reset();
  }

}
