import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class PuntoResumenService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('puntoresumen/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('puntoresumen',query, 'post');
  }
  update(query:any){
    return this._model.querys('puntoresumen/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('puntoresumen/'+query.id, query, 'delete');
  }
}