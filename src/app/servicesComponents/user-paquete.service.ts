import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class UserPaqueteService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('userpaquete/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('userpaquete',query, 'post');
  }
  update(query:any){
    return this._model.querys('userpaquete/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('userpaquete/'+query.id, query, 'delete');
  }
}