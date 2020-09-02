import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class TokenPlatformService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('tokenplatform/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('tokenplatform',query, 'post');
  }
  update(query:any){
    return this._model.querys('tokenplatform/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('tokenplatform/'+query.id, query, 'delete');
  }
}