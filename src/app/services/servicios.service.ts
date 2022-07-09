import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { USER } from '../interfaces/sotarage';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserAction } from '../redux/app.actions';
import { ToolsService } from './tools.service';
import { catchError } from 'rxjs/operators';
import * as _ from 'lodash';

declare var io: any;
const headers = new HttpHeaders({
  'X-Api-Key': ""
});

const URL = environment.url;
const URLFILE = environment.URLFILE;

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  public sock: any;
  public disable_reconect: boolean = false;
  public interval:any;
  public dataUser:any = {};
  private handleError: any;

  constructor(
    private http: HttpClient,
    private _store: Store<USER>,
    private Router: Router,
    private _tools: ToolsService
  ) { 
    this.conectionSocket();
    this.createsocket("emitir", {mensaje:"inicial"}); 
    this.privateDataUser();
  }
  privateDataUser(){
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
    if(Object.keys(this.dataUser).length >0 ){
      this.querys('user/querys',{
        where:{
          id: this.dataUser.id
        }
      }, 'post').subscribe((res:any)=>{
        res = res.data[0];
        if(!res) {
          let accion = new UserAction(this.dataUser,'delete')
          this._store.dispatch(accion);
          localStorage.removeItem('user');
          this._tools.presentToast("Tu sesión ha expirado")
          this.Router.navigate(['/login']);
          setTimeout(function(){ location.reload(); }, 3000);
        }
      });
    }
  }
  private ejecutarQuery(url: string, data, METODO){
    return this.http[METODO]( url, data );
  }

  querys(query:string, datas:any, METODO:string){
    let data = datas;
    if(!datas.where) datas.where = {};
    data.skip = datas.page ? datas.page : 0;
    data.limit = datas.limit ? datas.limit : 10;
    query = URL+`/${query}`;
    delete data.where.app;
    return this.ejecutarQuery(query, data, METODO);
  }

  querysEnvio(query:string, datas:any, METODO:string){
    let data = datas;
    if(!datas.where) datas.where = {};
    data.skip = datas.page ? datas.page : 0;
    data.limit = datas.limit ? datas.limit : 10;
    query = URLFILE+`/${query}`;
    return this.ejecutarQuery(query, data, METODO);
  }

  async createsocket(modelo: string, query: any) {
      return new Promise(async (promesa) => {
        query.modelo = modelo;
        try {
          await this.sock.post(URL + '/socket/emitir', query, (rta) => {
            // console.log(rta, modelo);
            promesa(rta)
          });
        } catch (error) {
          promesa("exitoso");
        }
      })

  }
  init_process_socket() {
    let
      init: any = 0
    ;
    this.interval = setInterval(() => {
      init += 1;
      if (init === 3) {
        init = 0;
        if(this.disable_reconect) {
          this.conectionSocket();
        }
      }
    }, 1000);
  }
  stopConter(interval: any) {
    clearInterval(interval);
  }
  /* Primera la conexion de configuracion del socket */
  conectionSocket() {
    try {
      if (io) {
        io.sails.autoConnect = false;
        this.sock = io.sails.connect(URL);
        this.scoket_global();
      }
    } catch (error) {
    }
  }
  scoket_global() {
    /* determinar  la conexion del socket con el back  */
    this.sock.on('connect',() => {
      console.log('conectado');
      this.disable_reconect = false;
      this.stopConter(this.interval);
    });
    /* Reconectar si se cae la conexion del socket */
    this.sock.on('disconnect', () =>{
      console.log('desconectado');
      this.disable_reconect = true;
      this.init_process_socket()
    });
  }
  query(modelo: string, query: any) {
    if (!query) {
      query = {};
    }
    if (!query.where) {
      query = {
        where: query
      }
        ;
    }
    const ruta = _.split(modelo, '/', 2);
    if (ruta[1]) {
      modelo = modelo;
    } else {
      modelo = modelo + '/query';
    }

    query.app = this.adsSecuryty();
    return this.http.post(URL + modelo, query).pipe(
      catchError(this.handleError)
    );
  }
  private adsSecuryty() {
    return 'publihazclickrootadmin';
  }
}
