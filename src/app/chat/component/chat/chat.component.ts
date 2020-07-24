import { Component, OnInit } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { DemoAdapter } from '../demo-adapter';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  
  title = 'app';

  public adapter: ChatAdapter = new DemoAdapter();

  //public adapter: ChatAdapter = new DemoAdapterPagedHistory();
  ngOnInit(){

  }
  
  public messageSeen(event: any)
  {
    console.log(event);
  }
}
