import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { BancosService } from 'src/app/servicesComponents/bancos.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { RetirosService } from 'src/app/servicesComponents/retiros.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { PuntosResumenService } from 'src/app/servicesComponents/puntos-resumen.service';

@Component({
  selector: 'app-formretiros',
  templateUrl: './formretiros.component.html',
  styleUrls: ['./formretiros.component.scss']
})
export class FormretirosComponent implements OnInit {
  
  data:any = {};
  id:any;
  listBancos:any = [];
  formatoMoneda:any = {};
  dataUser:any = {};
  disableFile:boolean = false;

  constructor(
    private activate: ActivatedRoute,
    private _tools: ToolsService,
    private _bancos: BancosService,
    private _store: Store<STORAGES>,
    private _retiros: RetirosService,
    private _puntosResumen: PuntosResumenService,
    private Router: Router
  ) {
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
   }

  ngOnInit() {
    this.formatoMoneda = this._tools.formatoMoneda;
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getRetiros();
    else { this.data.titulo = moment().format("DD-MM-YYYY HH:MM:SS"); this.data.estado = "pendiente"; this.data.codigo = this.codigo(); this.getPuntosUser();}
    this.getBancos();
  }

  getRetiros(){
    this._retiros.get( { where: { id: this.id },limit: 1 }).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res )  return this.Router.navigate( ["dashboard/retiros"] );
      if( res.tipoBanco ) if( res.tipoBanco.id ) res.tipo = res.tipoBanco.id;
      this.data = res;
    },error => this.Router.navigate( ["dashboard/retiros"] ) );
  }

  getPuntosUser(){
    this._puntosResumen.get( { where: { user: this.dataUser.id, state: "valido" }, limit: 1 } ).subscribe(( res:any )=>{
      res = res.data[0];
      if( res ) this.data.cantidad = res.valorTotal;
      else this.data.cantidad = 0;
    });
  }

  getBancos(){
    this._bancos.get( { where: { estado: "activo", user: this.dataUser.id }, limit: 100 } ).subscribe(( res:any )=> {
      res = res.data;
      this.listBancos = res;
    });
  }

  codigo(){
    return (Date.now().toString(20).substr(2, 3) + Math.random().toString(20).substr(2, 3)).toUpperCase();
  }

  submit(){
    this.disableFile = true;
    if( this.id ) this.editar();
    else this.guardar();
  }

  guardar() {
    this.data.user = this.dataUser.id;
    this.data.autocreo = false;
    this._retiros.create(this.data).subscribe((res: any) => {
      this._tools.tooast({ title: "Retiro Creada" });
      this.disableFile = false;
      this.Router.navigate( [ 'dashboard/retiros' ]);
    }, (error: any) => { this._tools.tooast({ title: "Error de servidor", icon: 'error' }); this.disableFile = false; })
  }

  editar() {
    let data:any = _.omitBy(this.data, _.isNull);
    data = _.omit(this.data, [ 'user', 'viewlive', 'where' ])
    this._retiros.update( data ).subscribe((res: any) => {
      this._tools.tooast({ title: "Retiro Actualizada" });
      this.disableFile = false;
    }, (error: any) => { this._tools.tooast({ title: "Error de servidor", icon: 'error' }); this.disableFile = false; })
  }

}
