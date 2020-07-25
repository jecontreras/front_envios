import { Injectable } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Injectable({
  providedIn: 'root'
})
export class MerkaplaceService {

  constructor(
    private _model: ServiciosService
  ) { }

  get(query:any){
    return this._model.querys('merkaplace/querys',query, 'post');
  }
  create(query:any){
    return this._model.querys('merkaplace',query, 'post');
  }
  update(query:any){
    return this._model.querys('merkaplace/'+query.id, query, 'put');
  }
  delete(query:any){
    return this._model.querys('merkaplace/'+query.id, query, 'delete');
  }
}