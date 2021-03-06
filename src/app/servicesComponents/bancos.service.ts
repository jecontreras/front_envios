import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('bancos/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('bancos',query, 'post');
  }
  update(query:any){
    return this._model.querys('bancos/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('bancos/'+query.id, query, 'delete');
  }
}
