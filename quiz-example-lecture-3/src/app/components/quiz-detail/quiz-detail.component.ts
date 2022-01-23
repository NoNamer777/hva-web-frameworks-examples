import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Quiz} from "../../model/quiz";

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {

  @Input()
  editingQuiz: Quiz;

  @Output()
  quizEdited: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() { }

  ngOnInit(): void {
  }

  onSave() {
    this.quizEdited.emit(this.editingQuiz);
  }

}
