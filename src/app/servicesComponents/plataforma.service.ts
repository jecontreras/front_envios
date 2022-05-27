import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('plataforma/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('plataforma',query, 'post');
  }
  update(query:any){
    return this._model.querys('plataforma/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('plataforma/'+query.id, query, 'delete');
  }
}
