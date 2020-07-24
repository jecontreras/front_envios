import { Component, OnInit } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  
  title = 'app';
  userId = 999;
  public adapter: ChatAdapter;

  constructor() { }

  ngOnInit() {
  }


}
