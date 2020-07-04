import { Component, OnInit, Input } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';

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

  constructor(
    private _tools: ToolsService
  ) { }

  ngOnInit() {
    this.getRow();
  }

  getRow(){
    this._modelo.get(this.query).subscribe((res:any)=> this.procesoGet( res ), (error)=> this._tools.tooast( { title: "Error de servidor", icon: "error" } ))
  }
  
  openPublic( item ){
    console.log( item );
    window.open( item.content );
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
    res.data = _.map( res.data, row =>{
      if(!row.publicacion) return row;
      else return {
        titulo: row.publicacion.titulo,
        idPublicacion: row.publicacion.id,
        descripcion: row.publicacion.descripcion,
        type: row.publicacion.type,
        content: row.publicacion.content,
        imgdefault: row.publicacion.imgdefault,
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
