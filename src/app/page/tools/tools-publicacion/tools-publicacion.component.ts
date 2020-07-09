import { Component, OnInit, Input } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
const URL = environment.urlFront;

@Component({
  selector: 'app-tools-publicacion',
  templateUrl: './tools-publicacion.component.html',
  styleUrls: ['./tools-publicacion.component.scss']
})
export class ToolsPublicacionComponent implements OnInit {
  
  public listRow: any = [];
  public count: number = 0;
  
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  @Input() _modelo: any;
  @Input() query: any;
  @Input() config: any;

  tarea:any = {
    completado: 0,
    restante: 0
  };

  progreses:boolean = false;

  constructor(
    private _tools: ToolsService
  ) { }

  ngOnInit() {
    console.log( this.config );
    this.getRow();
  }

  getRow(){
    this.progreses = true;
    this._modelo.get(this.query).subscribe((res:any)=> this.procesoGet( res ), (error)=> { this.progreses = false; this._tools.tooast( { title: "Error de servidor", icon: "error" } )} );
  }
  
  openPublic( item ){
    console.log( item );
    let url:string = item.content;
    if( this.config.vista == "tareas" ) { item.estado = "realizado"; url = URL+`/publicacionviews/${ item.id }`;}
    //console.log( url );
    window.open( url );
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getRow();
     }
   }

  procesoGet( res:any ){
    console.log( res );
    this.progreses = false;
    res.data = _.map( res.data, row =>{
      if(row.estado == "activo") this.tarea.restante++;
      else this.tarea.faltante++;
      if(!row.publicacion) return {
        fotoUser: row.user.foto,
        userName: row.user.username,
        ...row
      };
      else return {
        titulo: row.publicacion.titulo,
        idPublicacion: row.publicacion.id,
        descripcion: row.publicacion.descripcion,
        type: row.publicacion.type,
        content: row.publicacion.content,
        imgdefault: row.publicacion.imgdefault,
        fotoUser: row.publicacion.user.foto,
        userName: row.publicacion.user.username,
        ... row
      }
    });
    this.listRow = _.unionBy(this.listRow || [], res.data, 'id');
    this.count = res.count;
        
    if (res.data.length === 0 ) {
      this.notEmptyPost =  false;
    }
    this.notscrolly = true;
  }

}
