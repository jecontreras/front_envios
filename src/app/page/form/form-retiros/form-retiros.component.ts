import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { PuntosResumenService } from 'src/app/servicesComponents/puntos-resumen.service';
import { PuntosService } from 'src/app/servicesComponents/puntos.service';
import { Store } from '@ngrx/store';
import { RetirosService } from 'src/app/servicesComponents/retiros.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { RecogiasService } from 'src/app/servicesComponents/recogias.service';

@Component({
  selector: 'app-form-retiros',
  templateUrl: './form-retiros.component.html',
  styleUrls: ['./form-retiros.component.scss']
})
export class FormRetirosComponent implements OnInit {
  data:any = {
    pais: "colombia"
  };
  dataUser:any = {};
  superSub:boolean = true;
  opcionCurrencys:any;
  id:any;

  constructor(
    private _store: Store<STORAGES>,
    public _tools: ToolsService,
    private _puntosResumen: PuntosResumenService,
    private _retiro: RetirosService,
    private activate: ActivatedRoute,
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};

    });
  }

  ngOnInit() {
    this.opcionCurrencys = this._tools.currency;
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getFlete();
    else this.getPuntosResumen();
  }

  getFlete(){
    this._retiro.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res ) return false;
      this.data = res;
      this.data.nombre = this.data.user.name;
      this.data.metodo = this.data.tipoBanco;
      this.data.monto = this.data.pagoFlete + this.data.cantidad;
      this.data.sumaFlete = this.data.pagoFlete;
      this.data.totalrecibir = this.data.cantidad;
      console.log( this.data );
    },( error )=> this._tools.tooast( { title: "Error de servidor", icon:"error"} ) );
  }

  getPuntosResumen(){
    this._puntosResumen.get( { where: { user: this.dataUser.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      console.log( res );
      if( !res ) return false;
      this.data.monto = res.valorTotal;
      this.data.sumaFlete = res.fleteValorTotal;
      this.data.totalrecibir = Number( res.valorTotal ) - Number( res.fleteValorTotal );
    });
  }

  crearRetiro(){
    let data:any = {
      titulo: this.data.nombre,
      slug: _.kebabCase( this.data.nombre ),
      cedula: this.data.cedula,
      celular: this.data.celular,
      tipoBanco: this.data.metodo,
      pais: this.data.pais,
      cob_num_cuenta: this.data.cob_num_cuenta,
      ciudad_corregimiento: this.data.ciudad_corregimiento,
      cob_nombre_banco: this.data.cob_nombre_banco,
      email: this.dataUser.email,
      cantidad: this.data.totalrecibir,
      user: this.dataUser.id,
      descripcion: this.data.cob_descripcion
    };
    console.log("**", data )
    this._retiro.create( data ).subscribe(( res:any )=>{
      this._tools.tooast( { title: "Retiro Completado", icon: "succes" } );
      window.close();
    })
  }

  updateEstado(){
    this._retiro.update( { id: this.id, estado: this.data.estado }).subscribe(( res:any )=>{
      this._tools.tooast( { title: "Estado Actualizado "} );
    });
  }

}
