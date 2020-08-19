import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-estado-guias',
  templateUrl: './estado-guias.component.html',
  styleUrls: ['./estado-guias.component.scss']
})
export class EstadoGuiasComponent implements OnInit {

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
    header: ["Opciones","Guia","# Factura","Doc Referencia","Valor Pedido","Transportador","Agente","Peso","Piezas","Flete","Manejo","Flete x Recaudo","Total","Vlr Recaudo","Fecha / Dest","Estado","Novedades Global"],
    listRow: []
  };
  urlFront:string = environment.urlFront;
  formatoMoneda:any = {};

  constructor(
    private _tools: ToolsService,
    private _flete: FleteService,
    private _store: Store<STORAGES>
  ) { 

  }

  ngOnInit() {
    this.formatoMoneda = this._tools.formatoMoneda;
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

   detalles( item:any ){
      window.open( `${ this.urlFront }/dashboard/guiadetalles/${ item.id }`, "Detalles Guias", "width=640, height=480");
   }

   openView( url:string ){
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


}
