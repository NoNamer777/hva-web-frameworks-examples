import { Injectable } from '@angular/core';
import {Quiz} from "../model/quiz";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizzes: Quiz[] = [];

  constructor() {
    this.initQuizzes();
  }

  initQuizzes() {
    this.quizzes.push(new Quiz(1, "Distance from the Earth to the Moon"))
    this.quizzes.push(new Quiz(2, "The oldest computer built"))
  }

  save(quiz: Quiz) {
    for(var i=0;i<this.quizzes.length;i++) {
      if(this.quizzes[i].id == quiz.id) {
        this.quizzes[i] = quiz;
        break;
      }
    }
  }
}
