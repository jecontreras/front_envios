import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-estados-guias',
  templateUrl: './estado-guias.component.html',
  styleUrls: ['./estado-guias.component.scss']
})
export class EstadoGuiasComponent implements OnInit {

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
    header: ["Opciones","Guia","# Factura","Valor Pedido","Transportador","Agente","Peso","Piezas","Flete","Manejo","Flete x Recaudo","Total","Vlr Recaudo","Fecha / Dest","Estado","Novedades Global"],
    listRow: []
  };
  urlFront:string = window.location.origin;
  formatoMoneda:any = {};

  filtro:any = {};
  rolName:string;

  constructor(
    public _tools: ToolsService,
    private _flete: FleteService,
    private _store: Store<STORAGES>
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
      if( Object.keys( this.dataUser ).length > 0 ) this.rolName = this.dataUser.rol.nombre;
      if( this.rolName !== 'admin' ) this.query.where.user = this.dataUser.id;
    });
  }

  ngOnInit() {
    this.formatoMoneda = this._tools.formatoMoneda;
    this.getRow();
  }

  getRow(){
    this.progreses = true;
    this._flete.get( this.query ).subscribe(( res:any )=>{
      this.tablet.listRow = _.unionBy(this.tablet.listRow || [], res.data, 'id');
      this.count = res.count;

      if (res.data.length === 0 ) {
        this.notEmptyPost =  false;
      }
      this.notscrolly = true;
      this.progreses = false;
    },(error)=> this.progreses = false );
  }

  getFiltro(){
    if( this.filtro.fecha1 && this.filtro.fecha2 ){
      this.query.where.createdAt = {
        ">=": moment( this.filtro.fecha1 ),
        "<=": moment( this.filtro.fecha2 )
      };
    }else delete this.query.where.users;
    if( this.filtro.user ) this.query.where.users = this.filtro.user;
    this.query.page = 0;
    this.tablet.listRow = [];
    this.getRow();
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getRow();
     }
   }

   detalles( item:any ){
     console.log( item );
    //  if( item.transportadoraSelect == "ENVIA" ) window.open( `http://200.69.100.66/OnlineR/Rastreo1.aspx?Mca_MostrarFlete=0&Guia=${ item.nRemesa }`, "Detalles Guias", "width=640, height=480" );
    //  else
     window.open( `${ this.urlFront }/dashboard/guiadetalles/${ item.nRemesa }`, "Detalles Guias", "width=640, height=480");
    }

   openView( data:any, vista:string = "urlRotulos" ){
     console.log(data, vista)
     let url:string;
     if( data.transportadoraSelect == 'ENVIA'){
       if( vista == 'urlRotulos')  url = data.urlRotulos;
       if( vista == 'urlRelacionenvio')  url = data.urlRelacionenvio;
     }
     if( data.transportadoraSelect == 'CORDINADORA'){

     }
     window.open( url );
   }

   updateInfro( item:any, opt:string){
     if( this.btnDisabled ) return false;
     this.btnDisabled = true;
     let data:any = { id: item.id }; data[opt] = item[opt];
     this._flete.update( data ).subscribe(( res:any )=>{
      this._tools.tooast( { title: "Actualizado exitoso" } );
      this.btnDisabled = false;
     },( error )=> { this._tools.tooast( { title: "Error en el servidor", icon:"error" } ); this.btnDisabled = false; } );
   }

   async cancelar( item:any ){
    let alerta = await this._tools.confirm({title:"Eliminar", detalle:"Deseas Eliminar Dato", confir:"Si Eliminar"} );
    if( !alerta.value ) return false;
    let data = {
      id: item.id,
      estado: "ANULADA EN " + item.barrioDestinatario,
      nRemesa: item.nRemesa,
      state: 1,
      transportadoraSelect: item.transportadoraSelect
    };
    item.estadosName = data.estado;
    this.btnDisabled = true;
     this._flete.fleteBorrar( data ).subscribe(( res:any )=>{
       this._tools.tooast( { title: "Eliminado Guia exitoso" } );
       this.btnDisabled = false;
     },( error:any )=> { this._tools.tooast( { title: "Error de servidor", icon:"error" } ); this.btnDisabled = false; } );
  }


}
