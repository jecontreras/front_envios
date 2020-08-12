import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-flete',
  templateUrl: './flete.component.html',
  styleUrls: ['./flete.component.scss']
})
export class FleteComponent implements OnInit {

  //public listRow: any = [];
  progreses:boolean = false;
  btnDisabled:boolean = false;
  public query:any = { 
    where:{ 

    }, 
    sort: "createdAt DESC",
    page: 0
   };
  public count: number = 0;
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  dataUser:any = {};
  tablet:any = {
    header: ["Opciones","Codigo", "Numero Relacion", "Fecha Despacho", "Nombre Remitente", "Telefono Remitente", "Nombre Destinatario", "Ciudad de origen", "Telefono Destinatario", "Ciudad destinatario", "Total valor mercancia", "Total valor de producto"],
    listRow: []
  }

  constructor(
    private Route: Router,
    private _tools: ToolsService,
    private _flete: FleteService,
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
    this.getRow();
  }

  getRow(){
    this.progreses = true;
    this._flete.get( {} ).subscribe(( res:any )=>{
      this.tablet.listRow = _.unionBy(this.tablet.listRow || [], res.data, 'id');
      this.count = res.count;
          
      if (res.data.length === 0 ) {
        this.notEmptyPost =  false;
      }
      this.notscrolly = true;
      this.progreses = false;
    },(error)=> this.progreses = false );
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getRow();
     }
   }

  crear( item:any ){
    if( !item ) this.Route.navigate(["/dashboard/formflete"]);
    else this.Route.navigate(["/dashboard/formflete", item.id ]);
  }

}
