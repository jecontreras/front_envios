import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ComentariosPubService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('comentariopub/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('comentariopub',query, 'post');
  }
  update(query:any){
    return this._model.querys('comentariopub/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('comentariopub/'+query.id, query, 'delete');
  }
}