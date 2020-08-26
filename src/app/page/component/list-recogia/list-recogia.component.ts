import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as moment from 'moment';
import { RecogiasService } from 'src/app/servicesComponents/recogias.service';

@Component({
  selector: 'app-list-recogia',
  templateUrl: './list-recogia.component.html',
  styleUrls: ['./list-recogia.component.scss']
})
export class ListRecogiaComponent implements OnInit {

  progreses:boolean = false;
  btnDisabled:boolean = false;
  public query:any = { 
    where:{ }, 
    sort: "createdAt DESC",
    page: 0
   };
  public count: number = 0;
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  dataUser:any = {};
  tablet:any = {
    header: ["Opciones","Nombres","Telefono","Numero Cliente","Ciudad","Contiene","Numero Unidad","Total peso","Creado","Estado"],
    listRow: []
  };
  urlFront:string = environment.urlFront;
  formatoMoneda:any = {};
  filtro:any = {};
  rolName:string;

  constructor(
    private _tools: ToolsService,
    private _recogia: RecogiasService,
    private _store: Store<STORAGES>,
  ) { 
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
      this.query.where.user = this.dataUser.id;
      if( Object.keys( this.dataUser ).length > 0 ) this.rolName = this.dataUser.rol.nombre;
    });
  }

  ngOnInit() {
    this.formatoMoneda = this._tools.formatoMoneda;
    this.getRow();
  }

  getFiltro(){
    if( this.filtro.fecha1 && this.filtro.fecha2 ){
      this.query.where.createdAt = {
        ">=": moment( this.filtro.fecha1 ),
        "<=": moment( this.filtro.fecha2 )
      };
    }
    if( this.filtro.user ) this.query.where.users = this.filtro.user;
    else delete this.query.where.users;
    this.query.page = 0;
    this.tablet.listRow = [];
    this.getRow();
  }

  getRow(){
    this.progreses = true;
    this._recogia.get( this.query ).subscribe(( res:any )=>{
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

   async cancelar( item:any ){
     let alerta = await this._tools.confirm({title:"Eliminar", detalle:"Deseas Eliminar Dato", confir:"Si Eliminar"} );
     if( !alerta.value ) return false;
     let data = {
       id: item.id,
       estado: 2
     };
     item.estado = data.estado;
     this.btnDisabled = true;
      this._recogia.update( data ).subscribe(( res:any )=>{
        this._tools.tooast( { title: "Eliminado Recogia" } );
        this.btnDisabled = false;
      },( error:any )=> { this._tools.tooast( { title: "Error de servidor", icon:"error" } ); this.btnDisabled = false; } );
   }

   detalles( item:any ){
    window.open( `${ this.urlFront }/dashboard/solicitudrecogia/${ item.id }`, "Detalles Recogia", "width=940, height=600");
   }

}
