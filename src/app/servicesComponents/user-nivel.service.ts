import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class UserNivelService {

  constructor(
    private _model: ServiciosService
  ) { }

  get( query:any ){
    return this._model.querys('usernivel/querys',query, 'post');
  }
  create( query:any ){
    return this._model.querys('usernivel',query, 'post');
  }
  update( query:any ){
    return this._model.querys('usernivel/'+query.id, query, 'put');
  }
  delete( query:any ){
    return this._model.querys('usernivel/'+query.id, query, 'delete');
  }
  getDetalles( query:any ){
    return this._model.querys('usernivel/cargarnivel', query, 'post');
  }
}