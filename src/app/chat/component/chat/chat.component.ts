import { Component, OnInit } from '@angular/core';
import { ChatAdapter } from 'ng-chat';
import { DemoAdapter } from '../demo-adapter';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  title = 'app';
  userId: any = 999;

  public adapter: ChatAdapter = new DemoAdapter();

  //public adapter: ChatAdapter = new DemoAdapterPagedHistory();

  constructor(
    private _store: Store<STORAGES>
  ) {
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if (!store) return false;
      if( store.user ) this.userId = store.user.id;
    });
  }

  ngOnInit() {

  }

  public messageSeen(event: any) {
    console.log(event);
  }
}
