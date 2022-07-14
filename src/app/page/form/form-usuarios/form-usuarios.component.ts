import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { ToolsService } from 'src/app/services/tools.service';
import { PerfilService } from 'src/app/servicesComponents/perfil.service';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import * as _ from 'lodash';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import { CiudadesService } from 'src/app/servicesComponents/ciudades.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent implements OnInit {
  
  data:any = {
    pais: "colombia"
  };
  dataUser:any = {};
  id:any;
  listRoles:any = [];
  clone:any = {};
  listCiudades:any = DANEGROUP;
  keyword = 'slug';

  constructor(
    private _store: Store<STORAGES>,
    private activate: ActivatedRoute,
    private _user: UsuariosService,
    private _rol: PerfilService,
    private _tools: ToolsService,
    private _ciudades: CiudadesService,
  ) { 
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};

    });
  }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    this.getUsuario();
    this.getRoles();
    this.getCiudades();
  }

  getCiudades(){
    this._ciudades.get( { where: { }, limit: 10000000 } ).subscribe( ( res:any ) => {
      this.listCiudades = res.data;
    });
  }

  blurCiudad( ev:any ){
    this.data.departamento = ev.state + `( ${ ev.city } )`;
    this.data.ciudad = ev.city;
    this.data.codigoCiudad = ev.code;
    console.log( this.data, ev );
  }

  getUsuario(){
    this._user.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res ) return false;
      this.data = res;
      this.data.rol = this.data.rol.id;
      this.clone = _.clone( this.data );
      this.data.ciudadDestino = this.data.ciudad
    });
  }

  getRoles(){
    this._rol.get( { where: {  } } ).subscribe(( res:any )=>{
      this.listRoles = res.data;
    });
  }

  updateUser(){
    let data:any ={
      id: this.id,
      name: this.data.name,
      email: this.data.email,
      celular: this.data.celular,
      ciudad: this.data.ciudad,
      codigoCiudad: this.data.codigoCiudad,
      direccion: this.data.direccion,
      barrio: this.data.barrio,
      departamento: this.data.departamento,
      rol: this.data.rol
    };
    this._user.update( data ).subscribe( ( res:any ) =>{
      this._tools.tooast( { title: "Actualizado tu perfil" } );
    });
  }

}
