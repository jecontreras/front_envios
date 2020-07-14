import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArchivosService } from 'src/app/servicesComponents/archivos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PublicacionService } from 'src/app/servicesComponents/publicacion.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-formpublicacion',
  templateUrl: './formpublicacion.component.html',
  styleUrls: ['./formpublicacion.component.scss']
})
export class FormpublicacionComponent implements OnInit {

  editorConfig: any;
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
    this.editor();
    this.id = (this.activate.snapshot.paramMap.get('id'));
    //console.log(this.id);
    if (this.id) { this.titulo = "Editar"; this.getPublicacion() }
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
        if (this.data.type == "url") this.data.imgdefault = await this._archivo.getBase64(this.file.foto1[0]);
        else {
          this.data.imgdefault = await this._archivo.getBase64(this.file.foto1[0]);
          this.data.content = await this._archivo.getBase64(this.file.foto1[0]);
        }
      }
    } catch (error) { }
  }

  async submitFile() {
    if( !this.file.foto1[0] ) return false;
    this.disableFile = true;
    if (this.data.type == "url") await this.procesoSubidaImagen(this.file.foto1[0], 'imgdefault');
    else await this.procesoSubidaImagen( this.file.foto1[0], 'content');
    this.disableFile = false;
  }

  procesoSubidaImagen(file: any, opt: string) {
    return new Promise(resolve => {
      let form: any = new FormData();
      form.append('file', file);
      this._tools.ProcessTime({});
      this._archivo.create(form).subscribe((res: any) => {
        //console.log(form);
        this._tools.tooast({ title: "subido exitoso" });
        if (opt == 'imgdefault') this.data.imgdefault = res.files;
        if (opt == 'content') { this.data.content = res.files; this.data.imgdefault = res.files; }
        if (this.id) this.editar();
        this.file.foto1= [];
        resolve( true );
      }, error => { this._tools.tooast({ title: "Subido Error", icon: "error" }); resolve( false ) })
    });
  }

  async submit() {
    let validando = this.validador();
    if( !validando ) return false;
    this.disableFile = true;
    if (this.data.id) this.editar();
    else this.guardar();
  }

  validador(){
    if( !this.data.content ) { this._tools.tooast( { title: "Error falta Url o Imagen ", icon: "error"}); return false; }
    if( !this.data.descripcion ) { this._tools.tooast( { title: "Es Necesario que defina una descripcion", icon: "error"}); return false; }
    if( !this.data.imgdefault ) { this._tools.tooast( { title: "Error falta Imagen ", icon: "error"}); return false; }
    if( this.data.type == 'url' )if( !this.data.tipolink ) { this._tools.tooast( { title: "Error falta tipolink ", icon: "error"}); return false; }
    if( !this.data.title ) { this._tools.tooast( { title: "Error falta el titulo ", icon: "error"}); return false; }
    if( !this.data.type ) { this._tools.tooast( { title: "Error falta el type de publicacion ", icon: "error"}); return false; }
    return true;
  }

  guardar() {
    this.data.user = this.dataUser.id;
    this.data.autocreo = false;
    this._publicacion.create(this.data).subscribe((res: any) => {
      this._tools.tooast({ title: "Publicacion Creada" });
      this.disableFile = false;
      this.Router.navigate( [ 'dashboard/mispublicacion' ]);
    }, (error: any) => { this._tools.tooast({ title: "Error de servidor", icon: 'error' }); this.disableFile = false; })
  }

  editar() {
    let data:any = _.omitBy(this.data, _.isNull);
    data = _.omit(this.data, [ 'user', 'viewlive', 'where' ])
    this._publicacion.update( data ).subscribe((res: any) => {
      this._tools.tooast({ title: "Publicacion Actualizada" });
      this.disableFile = false;
    }, (error: any) => { this._tools.tooast({ title: "Error de servidor", icon: 'error' }); this.disableFile = false; })
  }

  crearDefecto() {
    this.disableFile = true;
    this._publicacion.get( { where: { estado: "activo", autocreo: false, state:0 }, sort: [{ clicks: "ASC" },{ createdAt: "ASC" }], limit: 1 } ).subscribe( ( res:any )=>{
      //console.log( res );
      res = res.data[0];
      this.disableFile = false;
      if( !res ) return false;
      delete res.id; delete res.clicks; delete res.updatedAt; delete res.user; delete res.createdAt; delete res.autocreo;
      this.data = res;
      this.ProbarUrl();
      this.probarLink();
    }, error => { this._tools.tooast( { title: "Error de servidor", icon:"error" } ); this.disableFile = false; } );
  }

  eventoDescripcion() {

  }

  async ProbarUrl() {
    if (this.data.tipolink == 'youtube') this.data.content = await this._publicacion.urlprueba(this.data.content);
  }
  async probarLink() {
    this.data.viewlive = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.content);
  }

  editor() {
    let config: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '300px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' }
      ],
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['bold', 'italic'],
        ['fontSize']
      ]
    };
    this.editorConfig = config;
  }

}
