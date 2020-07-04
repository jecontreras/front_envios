import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('notificaciones/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('notificaciones',query, 'post');
  }
  update(query:any){
    return this._model.querys('notificaciones/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('notificaciones/'+query.id, query, 'delete');
  }
}
