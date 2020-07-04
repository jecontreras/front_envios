import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/servicesComponents/actividad.service';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfaces/sotarage';

@Component({
  selector: 'app-tarea-mega',
  templateUrl: './tarea-mega.component.html',
  styleUrls: ['./tarea-mega.component.scss']
})
export class TareaMegaComponent implements OnInit {
  
  public query:any = { 
   where:{ 
    prioridad: "tarea-extra",
    user: {}
   }, 
   sort: "createdAt DESC",
   limit: 1000,
   page: 0
  };
  dataUser:any = {};

  constructor(
    public _actividad: ActividadService,
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
