import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './component/chat/chat.component';
import { NgChatModule } from 'ng-chat';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChatModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
