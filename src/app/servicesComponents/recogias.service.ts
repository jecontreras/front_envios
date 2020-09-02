import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class RecogiasService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('recogias/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('recogias',query, 'post');
  }
  update(query:any){
    return this._model.querys('recogias/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('recogias/'+query.id, query, 'delete');
  }
  consulfechas(query:any){
    return this._model.querys('recogias/consulfechas',query, 'post');
  }
  createRecogia(query:any){
    return this._model.querys('recogias/crearrecogia',query, 'post');
  }
  cancelarrecogia(query:any){
    return this._model.querys('recogias/cancelarrecogia',query, 'post');
  }
}