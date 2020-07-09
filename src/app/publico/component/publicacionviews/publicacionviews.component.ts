import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ActividadService } from 'src/app/servicesComponents/actividad.service';
import { PublicacionService } from 'src/app/servicesComponents/publicacion.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { PuntosService } from 'src/app/servicesComponents/puntos.service';
import  { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import { ActividadViejoService } from 'src/app/servicesComponents/actividadViejo.service';
import { ComentariosPubService } from 'src/app/servicesComponents/comentarios-pub.service';
import { ComentarioService } from 'src/app/servicesComponents/comentario.service';

@Component({
  selector: 'app-publicacionviews',
  templateUrl: './publicacionviews.component.html',
  styleUrls: ['./publicacionviews.component.scss']
})
export class PublicacionviewsComponent implements OnInit {
  public id: any;
  public cuerpo: any;
  public actividades: any;
  public actividadesReferidos: any;
  public actividad: any;
  public paquete: any;
  public vigencia: any;
  private comenForm: FormGroup;
  public state: boolean;
  public comentario: any = {};
  public user: any;
  public user1: any = {};
  public colores: any;
  public siguiente: any = {};
  public disablereport: any = false;
  public disablerealizado: any = true;
  _model:any = { user:{} };
  data:any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private _actividad: ActividadService,
    private _actividadViejo: ActividadViejoService,
    private _publicacion: PublicacionService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
    private _puntos: PuntosService,
    private _user: UsuariosService,
    private _comentarioPub: ComentariosPubService,
    private _comentario: ComentarioService
  ) {
    this.cuerpo = this._actividadViejo.cuerpo;
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if(!store) return false;
      this._model.user = store.user || {};
    });
  }

  ngOnInit() {
    console.log( this.cuerpo );
    this.comenForm = this.formBuilder.group({
        content: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      // console.log(params);
       if(params['id']!=null){
         this.id = params['id'];
         if(params['ids']!=null){
           this._model.user = {
             name: 'view',
             lastname: 'view',
             id: 123,
             username: 'view'
           };
           this.user1 = this._model.user;
           this.getpublicacionshare();
         }else this.getPublicacion();
       }
    });
    this.arraydecolor();
  }
  arraydecolor(){
    this.colores = [
      {
        titulo: 'orange',
        spanis: 'amarrilo',
        posicion: 1
      },
      {
        titulo: 'red',
        spanis: 'rojo',
        posicion: 2
      },
      {
        titulo: 'blue',
        spanis: 'azul',
        posicion: 3
      },
      {
        titulo: 'green',
        spanis: 'verde',
        posicion: 4
      }
    ]
    ;
    var
      rand = this.colores[Math.floor(Math.random() * this.colores.length)],
      posicion = _.random(0, 3)
    ;
    var m = _.orderBy(this.colores, ['posicion', 'age']);
    // console.log(posicion, m);
    if(rand){
      var
        idx = _.findIndex(this.colores, [ 'titulo', rand.titulo])
      ;
      if(idx >-1){
        // console.log(this.colores[idx]);
        this.colores[idx].id = true;
        this.colores[idx].posicion = posicion;
        this.siguiente = {
          spanis: this.colores[idx].spanis,
          titulo: this.colores[idx].titulo
        };
      }

    }
  }
  getPublicacion() {
    // console.log(this.id);
    this._actividad.get({ where:{
        id: this.id,
        // user: {
        //   '!=': null
        // }
      }
    }).subscribe(
      (res: any) => {
        if(res){
          // console.log(res);
          res = res.data[0];
          // this._model.user=res.user
          this.cuerpo.btn.open(this.cuerpo, res);
          this.actividad = res;
          this.cargarComentario(this.cuerpo);
        }
      }
    )
    ;
  }
  getpublicacionshare(){
    // console.log(this.id);
    this.actividad({
      where:{
        publicacion: this.id
      }
    }).subscribe(
      (res: any)=>{
        // console.log(res);
        res = res.data[0];
        if(res){
          this.actividad = res;
          this.cuerpo.btn.open(this.cuerpo, res);
        }
      }
    )
    ;
  }
  resolved(obj: any) {
      // console.log(obj);
      if(obj.id){
        this.pagarActividad(this.actividad);
      }else{
        this._tools.tooast( { title: "Error Al Seleccionar Color", icon:"error" } );
        this.arraydecolor();
      }
  }
  like(opt, obj) {
    // console.log(obj);
    const
      data = obj.data,
      num = 0,
      query = {
        id: 1,
        megusta: 0,
        nomegusta: 0
      }
    ;
    this.getpublicacion(obj)
    .subscribe((res: any) => {
      // console.log(res);
      res = res.data[0];
      if (res) {
        query.id = res.id;
        if (opt) {
          query.megusta = 1;
          if (res.megusta) {
            query.megusta = 1 + res.megusta;
          }
        } else {
          query.nomegusta = 1;
          if (res.nomegusta) {
            query.nomegusta = 1 + res.nomegusta;
          }
        }
        // console.log(query);
        obj.http.put(obj.url + 'publicacion/' + res.id, query)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe((res: any) => {
          // console.log(res);
          if (res) {
            data.publicacion.megusta = res.megusta;
            data.publicacion.nomegusta = res.nomegusta;
          }
        })
        ;
      }
    })
    ;
  }
  getpublicacion(obj) {
    return obj._model.query('publicacion', {
      id: obj.data.publicacion.id
    })
    ;

  }
  cargarComentario(model: any) {
    if (model.data.publicacion) {
      // console.log(model.data.publicacion.id);
      // console.log(model._model);
      return this._comentarioPub.get( { where:{ publicacion: model.data.publicacion.id } } )
      .subscribe( (response: any) => {
          console.log(response);
          response = response.data;
          this.comentario.list = response;
        });
    }
  }
  pushComentario(cuerpo: any) {
    //console.log(this.data);
    this.data.user = this._model.user.id;
    this._comentario.create( this.data )
        .subscribe(
          data => {
              // console.log('POST Request is successful ', data);
              this.pushput(data, cuerpo);
          },
          error => {
              console.log('Error', error);
          }
    );
  }
  pushput(data, cuerpo) {
    const
      query = {
        comentarios: data.id,
        publicacion: cuerpo.data.publicacion.id,
        user: this._model.user.id
      }
    ;
    this._comentarioPub.create( query )
      .subscribe(
        (response: any) => {
          // console.log(this.comentario, this.comenForm);
            this.comentario.list.push({
              user: {
                 username: this._model.user.username,
                 foto: this._model.user.foto,
                 id: this._model.user.id
               },
               comentarios: {
                 content: this.data.content
               },
               createdAt: new Date()
            })
            ;
            this.data.content = "";
            this._tools.tooast({ title: "Comentastes" });
        },
        error => {
            console.log('Error', error);
        }
    );
  }
  deletepublicacion(obj: any, data: any){
    // console.log(obj);
    const
      query: any = {
        id: obj.id
      },
      idx = _.findIndex(data, ['id', query.id])
    ;
    // console.log(data[idx])
    if(query.id){
      return this._model.delete('comentariopub', query.id, query)
        .subscribe(
          (response: any) => {
              // console.log('POST Request is successful ', response);
              this._tools.tooast( { title: "Eliminado", icon: "success" } );
              data.splice(idx, 1);
          },
          error => {
              console.log('Error', error);
          }
      );
    }
  }
  checkdelete(obj: any){
    // console.log(obj, this._model)
    if(obj.user.id === this._model.user.id){
      obj.check = !obj.check;
    }
  }
  openPublicacion(item: any) {
    this.actividad = item;
    this.cuerpo.btn.open(this.cuerpo, item);
    this.cargarComentario(this.cuerpo);
  }
  actividadRealizada() {
    if (this.cuerpo.btn.chequear(this.cuerpo)) {
      this.pagarActividad(this.actividad);
    }
  }
  private pagarActividad( actividad: any ) {
    if(actividad){
      // console.log(actividad);
      this.disablerealizado = false;
      this._puntos.get({ where:{ actividad: actividad.id } })
      .subscribe( (response: any) => {
          //console.log(response, actividad);
          if (!response.data.length) {
            const query = {
              codigo: this.codigo(),
              valor: actividad.valor,
              prioridad: actividad.prioridad,
              user: this._model.user,
              actividad: actividad.id
            };
            // console.log(query);
            if ( actividad.estado === 'activo' ) {
              this._puntos.generarPuntos( query )
              .subscribe(
                (rta: any) => {
                    // console.log(rta);
                    this.cambiarEstadoActividad(actividad);
                    this._tools.tooast( { title: "EL pago se registro correctamente" } );
                },
                (error: any) => {
                    console.log('Error', error);
                    this._tools.tooast( { title: "Verifica tu conexion a internet", icon: "error" } );
                }
              );
            } else {
              this._tools.tooast( { title: "Esta actividad ya tiene puntos pagados" } );
            }
          } else {
            this.cambiarEstadoActividad(actividad);
            this._tools.tooast( { title: "Esta actividad ya tiene puntos pagados" } );
          }
        },
        (error: any) => {
          this._tools.tooast( { title: "Verifica tu conexion a internet", icon: "error" } );
        }
      );
    }
  }
  private codigo() {
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
  }
  private cambiarEstadoActividad(actividad: any) {
    const query = {
      id: actividad.id,
      estado: 'realizado'
    };
    this._actividad.update( query )
    .subscribe( (response: any) => {
          // this._tools.openSnack('La actividad se registro correctamente', 'Ok', false);
          this.cambiarEstadoPublicacion(actividad);
          return true;
      },
      (error: any) => {
          console.log('Error', error);
      }
    );
  }

  private cambiarEstadoPublicacion(actividad: any) {
    const query = {
      clicks: actividad.publicacion.clicks + 1,
      id: actividad.publicacion.id
    };
    this._publicacion.update( query )
    .subscribe( (response: any) => {
          // this._tools.openSnack('La publicacion se registro correctamente', 'Ok', false);
          // this.cargarActividades();
          this.cuerpo.disable.puble = false;
      },
      (error: any) => {
          console.log('Error', error);
      }
    );
  }

}
