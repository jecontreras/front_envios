import { Component, OnInit } from '@angular/core';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  query:any = {
    where: {
      autocreo: false,
      type: "banner",
      estado: "activo"
    },
    sort: "createdAt ASC",
    page: 0,
    limit: 10
  };
  config:any = {
    vista: "banner"
  };
  dataUser:any = {};

  constructor(
    private _store: Store<STORAGES>
  ) { 
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
      this.query.where.user = this.dataUser.id;
    });

  }

  ngOnInit() {
  }

}