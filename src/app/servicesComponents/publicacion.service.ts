import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('publicacion/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('publicacion',query, 'post');
  }
  update(query:any){
    return this._model.querys('publicacion/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('publicacion/'+query.id, query, 'delete');
  }
}
