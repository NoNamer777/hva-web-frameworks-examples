import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../model/quiz";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.css']
})
export class QuizOverviewComponent implements OnInit {

  selectedQuiz: Quiz;

  // Injecting a service into the component
  constructor(private quizService: QuizService) {
  }

  get quizzes() {
    return this.quizService.quizzes;
  }

  ngOnInit(): void {
  }

  onSelectQuiz(quiz: Quiz) {
    // Making a copy of the object
    this.selectedQuiz = Object.assign(new Quiz(), quiz);
  }

  onQuizSaved(quiz: Quiz) {
    console.log(' received a quiz as an output', quiz);
    this.quizService.save(quiz);

    // force the selection of the saved quiz
    this.onSelectQuiz(quiz);
  }

}
