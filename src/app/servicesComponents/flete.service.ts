import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class FleteService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('fletes/querys',query, 'post');
  }
  getGuia(query:any){
    return this._model.querys('fletes/consultarguia',query, 'post');
  }
  create(query:any){
    return this._model.querys('fletes',query, 'post');
  }
  update(query:any){
    return this._model.querys('fletes/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('fletes/'+query.id, query, 'delete');
  }
  fleteCotizar( query:any ){
    return this._model.querys('fletes/consultarliquidacion',query, 'post');
  }
  fleteCrearTcc( query:any ){
    return this._model.querys('fletes/grabardespachotcc',query, 'post');
  }
  fleteCrearEnvia( query:any ){
    return this._model.querys('fletes/grabardespachoenvia',query, 'post');
  }
  fleteBorrar( query:any ){
    return this._model.querys('fletes/borrarflete',query, 'post');
  }
}