import { Component, OnInit } from '@angular/core';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-mis-publicacion',
  templateUrl: './mis-publicacion.component.html',
  styleUrls: ['./mis-publicacion.component.scss']
})
export class MisPublicacionComponent implements OnInit {

  query:any = {
    where: {
      autocreo: false,
      estado: "activo"
    },
    sort: "createdAt DESC",
    page: 0,
    limit: 10
  };
  config:any = {
    vista: "tareas"
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
      //this.query.where.user = this.dataUser.id;
    });

  }

  ngOnInit() {
  }

}
