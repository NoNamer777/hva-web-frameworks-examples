import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Quiz} from '../../model/quiz';
import {QuizService} from '../../services/quiz.service';

@Component({
  selector: 'app-component4',
  templateUrl: './component4.component.html',
  styleUrls: ['./component4.component.css']
})
export class Component4Component implements OnInit {

  selectedQuiz:any;

  constructor(private route: ActivatedRoute, private router: Router, private service: QuizService) {
    this.selectedQuiz = null;
  }

  ngOnInit() {
  }

  onSelectQuiz(quiz: Quiz) {
    this.selectedQuiz = quiz;
    this.router.navigate([quiz.acronym], { relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

  getAllQuizzes() {
    return this.service.getAllQuizzes();
  }

}
