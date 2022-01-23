import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {QuizService} from '../../services/quiz.service';
import {Quiz} from '../../model/quiz';

@Component({
  selector: 'app-component41',
  templateUrl: './component41.component.html',
  styleUrls: ['./component41.component.css']
})
export class Component41Component implements OnInit {

  quiz: any = null;

  constructor( private route: ActivatedRoute, private service: QuizService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const acronym = params.acronym;
        this.quiz = this.service.getQuizByAcronym(acronym);
      }
    );
  }

}
