import { Injectable } from '@angular/core';
import {Quiz} from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  mapQuiz: Map<string, Quiz> = new Map<string, Quiz>();

  constructor() {
    this.generateQuizzes();
  }

  private generateQuizzes() {

    this.mapQuiz.set('CULT', new Quiz('CULT', 'Culture', 100));
    this.mapQuiz.set('HIST', new Quiz('HIST', 'History', 50));
    this.mapQuiz.set('ECON', new Quiz('ECON', 'Economy', 75));
    this.mapQuiz.set('COMP', new Quiz('COMP', 'Computer Science', 120));
    this.mapQuiz.set('FILO', new Quiz('FILO', 'Philosophy', 80));
  }

  getAllQuizzes() {
    return Array.from( this.mapQuiz.values() );
  }

  getQuizByAcronym(acronym: string) {
    return this.mapQuiz.get(acronym);
  }

}
