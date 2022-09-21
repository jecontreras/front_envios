import { Component, OnInit } from '@angular/core';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-elaboracion-guias',
  templateUrl: './elaboracion-guias.component.html',
  styleUrls: ['./elaboracion-guias.component.scss']
})
export class ElaboracionGuiasComponent implements OnInit {
  
  dataUser:any = {};
  dataConfig:any = {
    vista: "login"
  };

  constructor(
    private _store: Store<STORAGES>,
  ) {
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
   }

  ngOnInit() {
  }

  
}
