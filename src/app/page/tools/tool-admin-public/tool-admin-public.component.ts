import { Component, OnInit, Input } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { PublicacionService } from 'src/app/servicesComponents/publicacion.service';
import { Router } from '@angular/router';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
const URL = environment.urlFront;

@Component({
  selector: 'app-tool-admin-public',
  templateUrl: './tool-admin-public.component.html',
  styleUrls: ['./tool-admin-public.component.scss']
})
export class ToolAdminPublicComponent implements OnInit {

  public listRow: any = [];
  public count: number = 0;
  
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  @Input() query: any;
  @Input() config: any;

  progreses:boolean = false;
  bloquear:any = false;
  dataUser:any = {};

  constructor(
    private _tools: ToolsService,
    private _publicacion: PublicacionService,
    private Router: Router,
    private _store: Store<STORAGES>
  ) { 
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
      if( this.dataUser.miPaquete ) this.bloquear = this.dataUser.miPaquete.cantidaddepublicidad;
      if( this.config ) if( this.config.vista == 'banner') this.bloquear = 2;
    });
  }

  ngOnInit() {
    console.log( this.config );
    this.getRow();
    if( this.config ) if( this.config.vista == 'banner') this.bloquear = 2;
  }


  getRow(){
    this.progreses = true;
    this._publicacion.get(this.query).subscribe((res:any)=> this.procesoGet( res ), (error)=> { this.progreses = false; this._tools.tooast( { title: "Error de servidor", icon: "error" } )} );
  }
  
  openPublic( item:any ){
    console.log( item );
    if( !item ) if( this.bloquear == 0 ) return false;
    if( this.config.vista == "publicacion"){
      if( item ) this.Router.navigate( [ "dashboard/formpublicacion", item.id ] );
      else this.Router.navigate( [ "dashboard/formpublicacion" ] );
    }
    if( this.config.vista == "banner"){
      if( item ) this.Router.navigate( [ "dashboard/formbanner", item.id ] );
      else this.Router.navigate( [ "dashboard/formbanner" ] );
    }
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getRow();
     }
   }

  procesoGet( res:any ){
    console.log( res );
    this.progreses = false;
    res.data = _.map( res.data, row =>{
      return {
        fotoUser: row.user.foto,
        userName: row.user.username,
        ...row
      };
    });
    this.listRow = _.unionBy(this.listRow || [], res.data, 'id');
    this.count = res.count;
        
    if (res.data.length === 0 ) {
      this.notEmptyPost =  false;
    }
    this.notscrolly = true;
  }

}
