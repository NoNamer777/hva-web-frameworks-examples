import { Component, Input, OnInit } from '@angular/core';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-component41',
  templateUrl: './component41.component.html',
  styleUrls: ['./component41.component.css']
})
export class Component41Component implements OnInit {

  public msg: any;

  @Input()
  sender: any;

  constructor(private msgService: MessageService) { }

  ngOnInit() {}

  onSend() {
    this.msgService.sendMessage({ content: this.msg, sender: this.sender});
    this.msg = '';
  }

}
