import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('nivel/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('nivel',query, 'post');
  }
  update(query:any){
    return this._model.querys('nivel/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('nivel/'+query.id, query, 'delete');
  }
}