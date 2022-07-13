import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('rol/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('rol',query, 'post');
  }
  update(query:any){
    return this._model.querys('rol/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('rol/'+query.id, query, 'delete');
  }
}
