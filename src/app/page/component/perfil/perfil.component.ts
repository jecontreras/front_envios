import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { UserAction } from 'src/app/redux/app.actions';
import { PAIS } from 'src/app/JSON/paises';
import { DEPARTAMENTO } from 'src/app/JSON/departamentos';
import { ArchivosService } from 'src/app/servicesComponents/archivos.service';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  
  data:any = {};
  dataUser:any = {};
  btnDisabled:boolean = false;
  id:any;
  listpais:any = PAIS;
  listdepartamento:any = DEPARTAMENTO;
  listciudades:any = [];
  listCiudades:any = DANEGROUP;
  keyword = 'city';

  file: any = {
    foto1: []
  };

  disableFile:boolean = false;

  constructor(
    private _store: Store<STORAGES>,
    private _user: UsuariosService,
    private _tools: ToolsService,
    private _archivo: ArchivosService
  ) { 
    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() {
    this.data = _.clone( this.dataUser );
    this.blurdepartamento();
    try { this.data.ciudadDestino = this.listCiudades.find( ( item:any )=> item.city == this.data.ciudad ).city; } catch (error) {}
  }

  async datafiles(ev: any) {
    //console.log( ev, this.file );
    this.file.foto1 = [];
    try {
      this.file.foto1 = ev.target.files;
      if (this.file.foto1[0]) {
        if (this.data.type == "url") this.data.foto = await this._archivo.getBase64(this.file.foto1[0]);
        else {
          this.data.foto = await this._archivo.getBase64(this.file.foto1[0]);
        }
      }
    } catch (error) { }
  }

  async submitFile() {
    if( !this.file.foto1[0] ) return false;
    this.disableFile = true;
    this.procesoSubidaImagen(this.file.foto1[0]);
    this.disableFile = false;
  }

  procesoSubidaImagen(file: any) {
    return new Promise(resolve => {
      let form: any = new FormData();
      form.append('file', file);
      this._tools.ProcessTime({});
      this._archivo.create(form).subscribe((res: any) => {
        //console.log(form);
        this._tools.tooast({ title: "subido exitoso" });
        this.data.foto = res.files;
        this.submit();
        this.file.foto1= [];
        resolve( true );
      }, error => { this._tools.tooast({ title: "Subido Error", icon: "error" }); resolve( false ) })
    });
  }

  blurCiudad(){
    console.log("perro")
    setTimeout(()=>{
      console.log( this.data );
      if( !this.data.ciudadDestino ) return false;
      this.data.departamento = this.data.ciudadDestino.state + `( ${ this.data.ciudadDestino.city } )`;
      this.data.ciudad = this.data.ciudadDestino.city;
      this.data.codigoCiudad = this.data.ciudadDestino.code;
    },2000);
  }

  blurdepartamento(){
    let filtro:any = this.listdepartamento.find( ( row:any )=> row.departamento == this.data.departamento );
    if( !filtro ) return false;
    this.listciudades = filtro.ciudades;
  }

  submit(){ 
    console.log( this.data );
    this.update();
  }

  update(){
    if( this.data.password ) return this.cambioPassword();
    this.data = _.omit( this.data, ['rol', 'password', 'confirpassword', 'cabeza','comentarios','publicaciones','referidos','rol','updatedAt','createdAt']);
    this._user.update(this.data).subscribe((res:any)=>{
      console.log(res);
      this.data = res;
      let accion = new UserAction( res, 'put');
      this._store.dispatch(accion);
      this._tools.tooast({ title: "Perfil Actualizado correctamente" });
      this.data.ciudadDestino = this.listCiudades.find( ( item:any )=> item.city == this.data.ciudad ).city;
    },(error)=> this._tools.tooast( { title: "Error al Actualizar el Perfil", icon: "error"}));
  }

  cambioPassword(){
    let data:any = {
      id: this.data.id,
      password: this.data.password,
      confirpassword: this.data.confirpassword
    };
    if( data.password !== data.confirpassword ) return this._tools.tooast({ title: "Error las contraseñas no son iguales", icon: "error"});
    this._user.cambioPass(data).subscribe((res:any)=>{
      console.log(res);
      this._tools.tooast( { title: "Contraseña actualizada" });
    },(error)=> { 
      let errors = error.error.data;
      this._tools.tooast( { title: errors ||  "Error de servidor", icon: "error" } ); } );
  }

}
