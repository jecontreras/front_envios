import { Component, OnInit } from '@angular/core';
import { ActividadService } from 'src/app/servicesComponents/actividad.service';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfaces/sotarage';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  public query:any = { 
    where:{ 
     prioridad: "tarea-diaria",
     user: {},
     create: true
    }, 
    sort: "createdAt DESC",
    limit: 5,
    page: 0
   };
   dataUser:any = {};
   config:any = {
    vista: "tareas"
  };
 
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
