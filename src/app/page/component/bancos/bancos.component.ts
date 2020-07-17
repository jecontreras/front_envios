import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { BancosService } from 'src/app/servicesComponents/bancos.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
})
export class BancosComponent implements OnInit {

  tablet:any = {
    dataHeader: ["Opciones","Banco","	Numero de La Cuenta","Tipo de Cuenta","Creado"],
    dataRow: [],
    count: 0
  };
  query:any = {
    where:{
      estado: "activo"
    },
    sort: "createdAt DESC",
    page: 0
  };
  data:any = {};
  progreses:boolean = false;
  public count: number = 0;
  
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  dataUser:any = {};

  constructor(
    private _tools: ToolsService,
    private _bancos: BancosService,
    private Router: Router,
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

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getRow();
     }
  }
   
  getRow(){
    this.progreses = true;
    this._bancos.get( this.query ).subscribe( async ( res:any ) =>{
      
      this.tablet.dataRow = _.unionBy( this.tablet.dataRow || [], res.data, 'id');
      this.tablet.count = res.count;
      this.progreses = false;
      // console.log( res );
    },( error:any )=> { this._tools.presentToast("Error de servidor"); this.progreses = false; });
  }

  verView( item:any ){
    if( item ) this.Router.navigate( [ "dashboard/formbancos", item.id ] );
    else this.Router.navigate( [ "dashboard/formbancos" ] );
  }

  async borrar( item:any ){
    let data:any = {
      id: item.id,
      estado: "inactivo"
    };
    let alert:any = await this._tools.confirm( { title:"Deseas eliminar", detalle:"confirmar si estas de acuerdo",confir:"Confirmar" } );
    alert = alert.value;
    if( !alert ) return false;
    this._bancos.update( data ).subscribe(( row:any )=>{
      this.tablet.dataRow = this.tablet.dataRow.filter( ( row:any ) => row.id !== item.id );
      this._tools.tooast( { title: "Borrado exitos"} );
    },( error ) => { this._tools.tooast( { title: "Error de servidor", icon: "error"} ) });
  }


}
