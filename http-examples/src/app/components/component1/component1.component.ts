import { Component, OnInit } from '@angular/core';
import {QuizService} from '../../services/quiz.service';
import {Quiz} from '../../model/quiz';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {

  quizzes: Quiz[] = [];
  quiz: Quiz = new Quiz();

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  onRequestFetch() {

    const subscription = this.quizService.getQuizzes();

    this.quizService.getQuizzes().subscribe(
      (data) => {
        this.quizzes = data;
      },
      (error) => {
        alert('HTTP Error: Status ' + error.status + ' - ' + error.error);
      }
    );

  }

  onAddQuiz() {
    this.quizzes.push(this.quiz);
    this.quiz = new Quiz();
  }

  isQuizValid() {
    return this.quiz.title && this.quiz.title !== '' &&
            this.quiz.acronym && this.quiz.acronym !== '';
  }

  onUpdateData() {
    this.quizService.updateQuizzes(this.quizzes).subscribe(
      (data) => {

      }, (error) => {
        alert('HTTP Error: Status ' + error.status + ' - ' + error.message);
      }
    );
  }

}
