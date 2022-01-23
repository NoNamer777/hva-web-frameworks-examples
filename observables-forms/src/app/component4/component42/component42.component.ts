import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Message, MessageService} from '../../services/message.service';

@Component({
  selector: 'app-component42',
  templateUrl: './component42.component.html',
  styleUrls: ['./component42.component.css']
})
export class Component42Component implements OnInit, OnDestroy {

  msgServiceSubscription: any;
  messages: Message[] = [];

  constructor(private msgService: MessageService) {
    this.messages.push({ sender: 'Mysterious Clown', content: 'Hello' });
    this.messages.push({ sender: 'Mysterious Clown', content: 'Would you like to play a game?'});
  }

  ngOnInit() {
    this.msgServiceSubscription = this.msgService.message.subscribe(
      (data: Message) => {
        this.messages.push(data);
      }
    );
  }

  ngOnDestroy(): void {
    this.msgServiceSubscription.unsubscribe();
  }


}
