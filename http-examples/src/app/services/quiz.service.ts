import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Quiz} from '../model/quiz';
import {Observable} from 'rxjs';
import {share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient: HttpClient) {
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.httpClient.get<Quiz[]>('https://wf-http-examples.firebaseio.com/quizzes.json');
  }

  updateQuizzes(quizzes: Quiz[]) {

    return this.httpClient.put('https://wf-http-examples.firebaseio.com/quizzes.json', quizzes);
  }

}
