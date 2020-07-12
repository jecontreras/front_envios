import { Component, OnInit } from '@angular/core';
import { ArchivosService } from 'src/app/servicesComponents/archivos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PublicacionService } from 'src/app/servicesComponents/publicacion.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'app-formbanner',
  templateUrl: './formbanner.component.html',
  styleUrls: ['./formbanner.component.scss']
})
export class FormbannerComponent implements OnInit {

  data: any = {};
  file: any = {
    foto1: []
  };
  btnDisabled: boolean = false;
  titulo: string = "Creacion";
  dataUser: any = {};
  id: string;
  disableFile:boolean = false;

  constructor(
    private _archivo: ArchivosService,
    private _publicacion: PublicacionService,
    private _tools: ToolsService,
    public sanitizer: DomSanitizer,
    private _store: Store<STORAGES>,
    private activate: ActivatedRoute,
    private Router: Router
  ) {
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if (!store) return false;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() {
    this.data.user = this.dataUser.id;
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if (this.id) { this.titulo = "Editar"; this.getPublicacion() }
    console.log( this.id )
  }

  getPublicacion() {
    this._publicacion.get({ where: { id: this.id } }).subscribe((res: any) => {
      res = res.data[0];
      this.procesoEdit(res);
    }, error => { this._tools.tooast({ title: "Error de servidor", icon: "error" }); })
  }

  procesoEdit(res: any) {
    //console.log(res);
    this.data = res;
    this.ProbarUrl();
    this.probarLink();
  }

  async datafiles(ev: any) {
    //console.log( ev, this.file );
    try {
      this.file.foto1 = ev.target.files;
      if (this.file.foto1[0]) {
        this.data.imgdefault = await this._archivo.getBase64(this.file.foto1[0]);
      }
    } catch (error) { }
  }

  async submitFile() {
    console.log( "HP");
    if( !this.file.foto1[0] ) return false;
    this.disableFile = true;
    await this.procesoSubidaImagen( this.file.foto1[0] );
    this.disableFile = false;
  }

  procesoSubidaImagen(file: any ) {
    return new Promise(resolve => {
      let form: any = new FormData();
      form.append('file', file);
      this._tools.ProcessTime({});
      this._archivo.create(form).subscribe((res: any) => {
        //console.log(form);
        this._tools.tooast({ title: "subido exitoso" });
        this.data.imgdefault = res.files;
        if( this.id ) this.editar();
        this.file.foto1= [];
        resolve( true );
      }, error => { this._tools.tooast({ title: "Subido Error", icon: "error" }); resolve( false ) })
    });
  }

  async submit() {
    this.data.type = "banner";
    let validando = this.validador();
    if( !validando ) return false;
    this.btnDisabled = true;
    if (this.data.id) this.editar();
    else this.guardar();
  }

  validador(){
    if( !this.data.content ) { this._tools.tooast( { title: "Error falta Url o Imagen ", icon: "error"}); return false; }
    if( !this.data.imgdefault ) { this._tools.tooast( { title: "Error falta Imagen ", icon: "error"}); return false; }
    if( !this.data.title ) { this._tools.tooast( { title: "Error falta el titulo ", icon: "error"}); return false; }
    if( !this.data.type ) { this._tools.tooast( { title: "Error falta el type de publicacion ", icon: "error"}); return false; }
    return true;
  }

  guardar() {
    this._publicacion.create(this.data).subscribe((res: any) => {
      this._tools.tooast({ title: "Publicacion Creada" });
      this.btnDisabled = false;
      this.Router.navigate( [ 'dashboard/banner' ]);
    }, (error: any) => { this._tools.tooast({ title: "Error de servidor", icon: 'error' }); this.btnDisabled = false; })
  }

  editar() {
    let data:any = _.omitBy(this.data, _.isNull);
    data = _.omit(this.data, [ 'user', 'viewlive', 'where' ])
    this._publicacion.update( data ).subscribe((res: any) => {
      this._tools.tooast({ title: "Publicacion Actualizada" });
      this.btnDisabled = false;
    }, (error: any) => { this._tools.tooast({ title: "Error de servidor", icon: 'error' }); this.btnDisabled = false; })
  }

  crearDefecto() {

  }

  async ProbarUrl() {
    if (this.data.tipolink == 'youtube') this.data.content = await this._publicacion.urlprueba(this.data.content);
  }
  async probarLink() {
    this.data.viewlive = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.content);
  }
}
