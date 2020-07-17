import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class PaquetesService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('paquete/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('paquete',query, 'post');
  }
  update(query:any){
    return this._model.querys('paquete/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('paquete/'+query.id, query, 'delete');
  }
}