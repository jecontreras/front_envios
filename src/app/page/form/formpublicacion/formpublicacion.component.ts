import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArchivosService } from 'src/app/servicesComponents/archivos.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PublicacionService } from 'src/app/servicesComponents/publicacion.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-formpublicacion',
  templateUrl: './formpublicacion.component.html',
  styleUrls: ['./formpublicacion.component.scss']
})
export class FormpublicacionComponent implements OnInit {

  editorConfig: any;
  data:any = {};
  file:any = {};
  btnDisabled: boolean = false;
  titulo:string = "Creacion";
  dataUser:any = {};

  constructor(
    private _archivo: ArchivosService,
    private _publicacion: PublicacionService,
    private _tools: ToolsService,
    public sanitizer: DomSanitizer,
    private _store: Store<STORAGES>
  ) { 
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() {
    this.editor();
    this.data.user = this.dataUser.id;
  }

  async datafiles( ev:any ){
    //console.log( ev, this.file );
    try {
      this.file.foto1 = ev.target.files;
      if( this.file.foto1[0] ) { 
        if( this.data.type == "url") this.data.imgdefault = await this._archivo.getBase64( this.file.foto1[0] );
        else {
          this.data.imgdefault = await this._archivo.getBase64( this.file.foto1[0] );
          this.data.content = await this._archivo.getBase64( this.file.foto1[0] );
        }
      }
    } catch (error) { }
  }

  submit(){
    this.btnDisabled = true;
    if( this.data.id ) this.editar();
    else this.guardar();
  }

  guardar(){
    this._publicacion.create( this.data ).subscribe(( res:any )=>{
      this._tools.presentToast("Publicacion Creada");
      this.btnDisabled = false;
    },( error:any )=> { this._tools.presentToast("Error de servidor"); this.btnDisabled = false; })
  }

  editar(){
    this._publicacion.update( this.data ).subscribe(( res:any )=>{
      this._tools.presentToast("Publicacion Actualizada");
      this.btnDisabled = false;
    },( error:any )=> { this._tools.presentToast("Error de servidor"); this.btnDisabled = false; })
  }

  crearDefecto(){

  }

  eventoDescripcion(){

  }

  async ProbarUrl( ){
    if( this.data.tipolink == 'youtube' ) this.data.content = await this._publicacion.urlprueba( this.data.content );
  }
  async probarLink(){
    this.data.viewlive = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.content);
  }

  editor(){
    let config:AngularEditorConfig = {
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
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
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
