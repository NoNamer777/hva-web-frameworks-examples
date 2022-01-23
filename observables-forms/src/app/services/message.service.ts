import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

export interface Message {
  sender: string,
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: Subject<Message> = new Subject<Message>();

  constructor() { }

  sendMessage(message: Message) {
    this.message.next(message);
  }
}
