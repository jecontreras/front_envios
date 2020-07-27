import { Component, OnInit } from '@angular/core';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { ToolsService } from 'src/app/services/tools.service';
import { PuntosService } from 'src/app/servicesComponents/puntos.service';
import { PuntosResumenService } from 'src/app/servicesComponents/puntos-resumen.service';
import { UserAction } from 'src/app/redux/app.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {
  
  formatoMoneda:any = {};
  dataUser:any = {};
  diasFaltantes:number = 0;

  constructor(
    private _store: Store<STORAGES>,
    private _tools: ToolsService,
    private _puntosResumen: PuntosResumenService
  ) { 
    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      this.dataUser = ( _.clone( store.user ) ) || {};
      if( this.dataUser.miPaquete ) {
        if( this.dataUser.miPaquete.diasFaltantes ) this.diasFaltantes = this.dataUser.miPaquete.diasFaltantes;
        else  this.diasFaltantes = 0;
      }else  this.diasFaltantes = 0;
    });
  }

  ngOnInit() { 
    this.formatoMoneda = this._tools.formatoMoneda;
  }

  getMisPuntos(){
    this._puntosResumen.get( { where: { user: this.dataUser.id, state: "valido" } } ).subscribe( ( res:any )=>{
      res = res.data[0];
      if ( !res ) return this.dataUser.cantidadPuntos = { valorTotal: 0 };
      else {
        this.dataUser.cantidadPuntos = res;
        let accion:any = new UserAction( this.dataUser, 'post');
        this._store.dispatch( accion );
      }
    },( error:any )=> this._tools.presentToast("Error de servidor"));
  }

}
