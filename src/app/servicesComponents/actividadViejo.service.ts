import { Injectable, DoCheck, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ServiciosService } from '../services/servicios.service';
import { environment } from 'src/environments/environment';
import { ToolsService } from '../services/tools.service';
import { STORAGES } from '../interfaces/sotarage';
import { Store } from '@ngrx/store';
// declare var estadoVentana: any;
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class ActividadViejoService implements OnInit, DoCheck {
  private url: string;
  public rta: any;
  public timerInterval: any;
  public data: any;
  urf: SafeResourceUrl;
  public cuerpo: any;
  dataUser:any = { user:{} };

  constructor(
    private _http: HttpClient,
    private _model: ServiciosService,
    public sanitizer: DomSanitizer,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
  ) {
    this.url = URL;
    this.rta = {
      _model: _model,
      _tools: _tools,
      paquete: {},
      vigencia: '',
      putactividadgratis: [],
      putactividadpagas: [],
      putactividadsuper: [],
      sanitizer: sanitizer,
      disabled: true,
      disabledpagas: true,
      disabledsuper: true,
      data: {},
      cumplidadGratis: 0,
      restanteGratis: 0,
      cumplidadPagas: 0,
      restantePagas: 0,
      cumplidadSuper: 0,
      restanteSuper: 0,
      actividadesextras: [],
      restanteExtras: 0,
      cumplidadExtras: 0,
      actividadreferidos: [],
      restanteReferidos: 0,
      cumplidadReferidos: 0,
      actividades: [],
      actividadesReferidos: [],
      actividadespagas: [],
      actividadessuper: [],
      contdisable: false,
      src: '',
      display: false,
      display2: false,
      display3: false,
      disable: {
        puble: false,
        contador: true,
        view: false,
        state: true
      },
      btn: {
        open: this.open,
        buttondisable: this.buttondisable,
        close: this.close,
        initConter: this.initConter,
        stopConter: this.stopConter,
        chequear: this.chequear,
        codigo: this.codigo
      },
      contador_s: 60,
      codigo: 0,
      textCodigo: '',
      stop: true,
      url: URL,
      http: _http
    };
    this.cuerpo = this.rta;
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if(!store) return false;
      this.dataUser.user = store.user || {};
    });

    this.getEstadoVentana(this.rta);
  }
  ngOnInit() {
  }
  ngDoCheck() {
  }
  getPaquete(obj: any) {
    return this._model.query('userpaquete/consulpaquete', {
      where: {
        user: obj.user.id
      },
      limit: 1
    })
      ;
  }

  cargarActividades() {
    // console.log(this.dataUser.nivel);
    const user: any = JSON.parse(localStorage.getItem('user'));
    if (this.dataUser.nivel) {
      user.nivel = this.dataUser.nivel.nivel.nivel;
      this.getgenerate(user);
    } else {
      return this._model.query('usernivel/cargarNivel', {
        user: user.id
      })
        .subscribe(
          (response: any) => {
            if (response) {
              user.nivel = response.nivel.nivel;
              this.getgenerate(user);
            }
          }
        )
        ;
    }
  }
  getgenerate(user: any) {
    if (user.id) {
      this._model.query('actividad/generarActividades', user)
        .subscribe(
          (response: any) => {
            // console.log(response);
            this.consulActividades();
          },
          (error: any) => {
            console.log('Error', error);
            this._tools.tooast( { icon: "error", title: "Estimado Usuario Verificar si tienes paquete activo si estas activo por favor comunicar el error'"} );
            this.consulActividades();
          }
        );
    }
  }
  public consulActividades() {
    const
      user: any = JSON.parse(localStorage.getItem('user'))
      ;
    if (user.id) {
      this._model.query('actividad', {
        where: {
          user: user.id,
          create: true,
          prioridad: 'tarea-diaria'
        },
        sort: "estado ASC"
      })
        .subscribe(
          (response: any) => {
            // console.log(response);
            this.cuerpo.actividades = [];
            const
              populatepublicacion: any = this.populatepublicacion,
              _model: any = this._model,
              actividades: any = this.cuerpo.actividades,
              actividadesextras: any = this.cuerpo.actividadesextras,
              actividadreferidos: any = this.cuerpo.actividadreferidos
              ;
            this.cuerpo.restanteGratis = 0;
            this.cuerpo.cumplidadGratis = 0;
            _.forEach(response.data, (item: any) => {
              // console.log(item);
              item.publicacion = {
                id: item.publicacion,
                user: {}
              };
              populatepublicacion(item, _model)
                .subscribe(
                  (rta: any) => {
                    rta = rta.data[0];
                    // console.log(rta);
                    if (rta) {
                      item.publicacion = rta;
                      if (!item.publicacion.user) {
                        item.publicacion.user = {};
                      }
                    }
                    if (item.prioridad === 'tarea-diaria') {
                      if (item.estado === 'realizado') {
                        this.cuerpo.cumplidadGratis += 1;
                      } else if (item.estado === 'activo') {
                        this.cuerpo.restanteGratis += 1;
                        item.disabled = true;
                      }
                      actividades.push(item);
                    }
                  }
                );
            });
            this.cuerpo.display = true;
          },
          (error: any) => {
            console.log('Error', error);
          }
        );
    }
  }
  getactividadesextra() {
    const
      user: any = JSON.parse(localStorage.getItem('user'))
      ;
    if (user.id) {
      this._model.query('actividad', {
        where: {
          user: user.id,
          create: true,
          prioridad: 'tarea-extra'
        },
        sort: "estado ASC"
      })
        .subscribe(
          (response: any) => {
            // console.log(response);
            // console.log(this.cuerpo);
            if (response.data.length) {
              this.cuerpo.actividadesextras = [];
              const
                populatepublicacion: any = this.populatepublicacion,
                _model: any = this._model,
                actividades: any = this.cuerpo.actividades,
                actividadesextras: any = this.cuerpo.actividadesextras,
                actividadreferidos: any = this.cuerpo.actividadreferidos
                ;
              this.cuerpo.cumplidadExtras = 0;
              this.cuerpo.restanteExtras = 0;
              _.forEach(response.data, (item: any) => {
                item.publicacion = {
                  id: item.publicacion,
                  user: {}
                };
                // console.log(item);
                populatepublicacion(item, _model)
                  .subscribe(
                    (rta: any) => {
                      rta = rta.data[0];
                      // console.log(rta);
                      if (rta) {
                        item.publicacion = rta;
                        if (!item.publicacion.user) {
                          item.publicacion.user = {};
                        }
                      }
                      if (item.prioridad === 'tarea-extra') {
                        if (item.estado === 'realizado') {
                          this.cuerpo.cumplidadExtras += 1;
                        } else if (item.estado === 'activo') {
                          this.cuerpo.restanteExtras += 1;
                          item.disabled = true;
                        }
                        // console.log(actividadesextras);
                        actividadesextras.push(item);
                      }
                    }
                  );
              });
            } else {
              // tslint:disable-next-line:max-line-length
              this._tools.tooast( { icon: "success", title: "Estimado Usuario ya pasaron los 25 dias desde su activacion de su paquete no podras resibir las 4 Tareas de mini anuncios de su paquete asta volverlo reactivar'"} );
            }
            this.cuerpo.display2 = true;
          },
          (error: any) => {
            console.log('Error', error);
          }
        );
    }
  }
  getactividadesreferido() {
    const
      user: any = JSON.parse(localStorage.getItem('user'))
      ;
    if (user.id) {
      this._model.query('actividad', {
        where: {
          user: user.id,
          prioridad: 'tarea-referidos',
          estado: 'activo'
        },
        sort: "estado ASC"
      })
        .subscribe(
          (rta: any) => {
            rta = rta.data;
            // console.log(rta);
            this.cuerpo.actividadreferidos = [];
            const
              populatepublicacion: any = this.populatepublicacion,
              _model: any = this._model,
              actividades: any = this.cuerpo.actividades,
              actividadesextras: any = this.cuerpo.actividadesextras,
              actividadreferidos: any = this.cuerpo.actividadreferidos
              ;
            this.cuerpo.cumplidadReferidos = 0;
            this.cuerpo.restanteReferidos = 0;
            _.forEach(rta, (item: any) => {
              // console.log(item)
              item.publicacion = {
                id: item.publicacion,
                user: {}
              };
              populatepublicacion(item, _model)
                .subscribe(
                  // tslint:disable-next-line:no-shadowed-variable
                  (rta: any) => {
                    rta = rta.data[0];
                    // console.log(rta);
                    if (rta) {
                      item.publicacion = rta;
                      if (!item.publicacion.user) {
                        item.publicacion.user = {};
                      }
                    }
                    if (item.prioridad === 'tarea-referidos') {
                      if (item.estado === 'realizado') {
                        this.cuerpo.cumplidadReferidos += 1;
                      } else if (item.estado === 'activo') {
                        this.cuerpo.restanteReferidos += 1;
                        item.disabled = true;
                      }
                      actividadreferidos.push(item);
                    }
                  }
                );
            });
            this.cuerpo.display3 = true;
          });
    }
  }
  populatepublicacion(obj: any, _model: any) {
    // console.log(obj);
    return _model.query('publicacion', {
      where: {
        id: obj.publicacion.id
      },
      limit: 1
    });
  }
  open(cuerpo: any, obj: any) {
    cuerpo.disable.view = true;
    // console.log(obj.publicacion);
    /*  console.log(cuerpo.sanitizer); */

    // console.log(dominio[0]+"//"+dominio[2]+"/embed/"+id[0]);
    obj.publicacion.content = obj.publicacion.content + '?rel=0&autoplay=1';
    this.urf = cuerpo.sanitizer.bypassSecurityTrustResourceUrl(obj.publicacion.content);
    obj.content = this.urf;
    // console.log(obj.publicacion);
    cuerpo.data = obj;
    if (cuerpo.data.prioridad === 'tarea-extra') {
      cuerpo.contador_s = 10;
    }
    this.initConter(cuerpo);
  }
  close(cuerpo: any) {
    // console.log(cuerpo);
    cuerpo.disable.puble = false;
  }
  getEstadoVentana(opt) {
    document.addEventListener('visibilitychange', function () {
      opt.stop = true;
      // console.log(document.visibilityState)
      if (document.visibilityState === 'hidden') {
        opt.stop = false;
      }
    });
  }
  initConter(cuerpo: any) {
    // tslint:disable-next-line:no-shadowed-variable
    cuerpo.contdisable = false;
    // tslint:disable-next-line:no-shadowed-variable
    const interval = setInterval(() => {
      // console.log(cuerpo.stop)
      if (cuerpo.stop) {
        cuerpo.contador_s = cuerpo.contador_s - 1;
      }
      if (cuerpo.contador_s === 0) {
        if (cuerpo.data.prioridad === 'tarea-extra') {
          cuerpo.contador_s = 10;
        } else {
          cuerpo.contador_s = 60;
        }
        // console.log(cuerpo.contador_s);
        cuerpo.contdisable = true;
        this.stopConter(cuerpo, interval);
      }
      // console.log(cuerpo.contador_s);
    }, 1000);
  }
  // tslint:disable-next-line:no-shadowed-variable
  stopConter(cuerpo: any, interval: any) {
    // console.log(this.timerInterval);
    clearInterval(interval);
    cuerpo.disable.contador = false;
    cuerpo.codigo = cuerpo.btn.codigo();
    // cuerpo.contador_s = 0;
  }
  codigo() {
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
  }

  chequear(cuerpo: any) {
    // console.log("chequear", _.upperFirst(cuerpo.textCodigo));
    // console.log(cuerpo.data);
    if (cuerpo.textCodigo === cuerpo.codigo) {
      // cuerpo.contdisable = true;
      if (cuerpo.data.prioridad === 'tarea-diaria') {
        if (cuerpo.cumplidadGratis !== 5) {
          cuerpo.cumplidadGratis += +1;
        }
        if (cuerpo.restanteGratis) {
          cuerpo.restanteGratis = cuerpo.restanteGratis - 1;
        }
      } else if (cuerpo.data.prioridad === 'tarea-referidos') {
        if (cuerpo.cumplidadGratis !== 5) {
          cuerpo.cumplidadGratis += +1;
        }
        if (cuerpo.restanteGratis) {
          cuerpo.restanteGratis = cuerpo.restanteGratis - 1;
        }
      } else {
        if (cuerpo.cumplidadSuper !== 5) {
          cuerpo.cumplidadSuper += +1;
          const
            query = {
              id: cuerpo.putactividadsuper[0].id,
              publicacion: cuerpo.data.id
            }
            ;
        }
        if (cuerpo.restanteSuper) {
          cuerpo.restanteSuper = cuerpo.restanteSuper - 1;
        }
      }
      cuerpo.data.check = true;
      this.close(cuerpo);
      return true;
    } else {
      cuerpo.textCodigo = '';
      cuerpo.codigo = cuerpo.btn.codigo();
      return false;
    }
  }
  buttondisable(data: any) {
    // console.log(data);
    if (data.putactividadgratis.length === 0) {
      // this._tools.openSnack('Entre', 'ok', false);
      data.disabled = false;
    }
    if (data.putactividadpagas.length === 0) {
      // this._tools.openSnack('Entre', 'ok', false);
      data.disabledpagas = false;
    }
    if (data.putactividadsuper.length === 0) {
      // this._tools.openSnack('Entre', 'ok', false);
      data.disabledsuper = false;
    }
    // console.log(data);
  }
}
