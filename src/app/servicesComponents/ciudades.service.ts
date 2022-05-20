import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('ciudades/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('ciudades',query, 'post');
  }
  update(query:any){
    return this._model.querys('ciudades/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('ciudades/'+query.id, query, 'delete');
  }

}