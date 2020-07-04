import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('actividad/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('actividad',query, 'post');
  }
  update(query:any){
    return this._model.querys('actividad/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('actividad/'+query.id, query, 'delete');
  }
}