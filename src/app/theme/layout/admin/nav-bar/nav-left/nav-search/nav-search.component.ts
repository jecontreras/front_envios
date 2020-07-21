import { Component, OnInit } from '@angular/core';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {
  
  formatoMoneda:any = {};
  dataUser:any = {};

  constructor(
    private _store: Store<STORAGES>,
    private _tools: ToolsService
  ) { 
    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() { 
    this.formatoMoneda = this._tools.formatoMoneda;
  }

}
