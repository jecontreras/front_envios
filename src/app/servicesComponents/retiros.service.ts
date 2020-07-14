import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class RetirosService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('retiros/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('retiros',query, 'post');
  }
  update(query:any){
    return this._model.querys('retiros/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('retiros/'+query.id, query, 'delete');
  }
}