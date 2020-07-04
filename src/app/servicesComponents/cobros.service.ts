import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class CobrosService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('tblcobrar/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('tblcobrar/create',query, 'post');
  }
  validador(query:any){
    return this._model.querys('tblcobrar/fechasDisponibles',query, 'post');
  }
  update(query:any){
    return this._model.querys('tblcobrar/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('tblcobrar/'+query.id, query, 'delete');
  }

}
