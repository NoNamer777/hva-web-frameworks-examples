import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../model/quiz';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../services/quiz.service';

@Component({
  selector: 'app-component7',
  templateUrl: './component7.component.html',
  styleUrls: ['./component7.component.css']
})
export class Component7Component implements OnInit {

  allowEditing: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams) => {
        this.allowEditing = queryParams.allowEditing;
      }
    );
  }

}
