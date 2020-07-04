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
    return this._model.querys('tblbancos/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('tblbancos',query, 'post');
  }
  update(query:any){
    return this._model.querys('tblbancos/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('tblbancos/'+query.id, query, 'delete');
  }
}
