import { Component, OnInit } from '@angular/core';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { PuntosResumenService } from 'src/app/servicesComponents/puntos-resumen.service';
import { PuntosService } from 'src/app/servicesComponents/puntos.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-monedero',
  templateUrl: './monedero.component.html',
  styleUrls: ['./monedero.component.scss']
})
export class MonederoComponent implements OnInit {

  listOrdenes:any = [];
  querys:any = {
    where:{
      state: [2,3],
      pagadoRt: false
    },
    sort: "createdAt DESC",
    page: 0,
    limit: 100000
  };
  dataInfo:any = {
    valor: 0,
    fleteValorTotal: 0,
    valorDisponible: 0
  };
  dataUser:any = {};
  urlFront:string = window.location.origin;

  constructor(
    private _fletes: FleteService,
    private _puntosResumen: PuntosResumenService,
    private _puntos: PuntosService,
    private _store: Store<STORAGES>,
    public _tools: ToolsService
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};

    });
  }

  ngOnInit() {
    this.getFletes();
    this.getPuntosResumen();
  }

  getFletes(){
    this.querys.where.user = this.dataUser.id;
    this._fletes.get( this.querys ).subscribe(( res:any ) => {
      this.listOrdenes = _.unionBy( this.listOrdenes || [], res.data, 'id' );
    });
  }

  getPuntosResumen(){
    this._puntosResumen.get( { where: { user: this.dataUser.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      console.log( res );
      if( !res ) return false;
      this.dataInfo.valor = res.valorTotal;
      this.dataInfo.valorFlete = res.fleteValorTotal;
      this.dataInfo.valorDisponible = ( Number( res.valorTotal ) - Number( res.fleteValorTotal ) );
    });
  }

  retirarDinero( item:any ){
    window.open( `${ this.urlFront }/dashboard/formRetiros/${ item.nRemesa || '' }`, "Formulario de retiros", "width=640, height=480");
  }

}
