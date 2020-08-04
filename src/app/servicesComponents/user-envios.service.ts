import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class UserEnviosService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('userenvios/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('userenvios',query, 'post');
  }
  update(query:any){
    return this._model.querys('userenvios/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('userenvios/'+query.id, query, 'delete');
  }

}