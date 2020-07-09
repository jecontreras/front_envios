import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('comentario/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('comentario',query, 'post');
  }
  update(query:any){
    return this._model.querys('comentario/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('comentario/'+query.id, query, 'delete');
  }
}