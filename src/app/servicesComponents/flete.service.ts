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
  create(query:any){
    return this._model.querys('fletes',query, 'post');
  }
  update(query:any){
    return this._model.querys('fletes/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('fletes/'+query.id, query, 'delete');
  }
}