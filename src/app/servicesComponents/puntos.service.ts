import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {

  constructor(
    private _model: ServiciosService
  ) { }

  get( query:any ){
    return this._model.querys('puntos/querys',query, 'post');
  }
  create( query:any ){
    return this._model.querys('puntos',query, 'post');
  }
  update( query:any ){
    return this._model.querys('puntos/'+query.id, query, 'put');
  }
  delete( query:any ){
    return this._model.querys('puntos/'+query.id, query, 'delete');
  }
  generarPuntos( query:any ){
    return this._model.querys('puntos/generatepuntos',query, 'post');
  }
}