import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { UserNivelService } from 'src/app/servicesComponents/user-nivel.service';

@Component({
  selector: 'app-referidos',
  templateUrl: './referidos.component.html',
  styleUrls: ['./referidos.component.scss']
})
export class ReferidosComponent implements OnInit {

  tablet:any = {
    dataHeader: ["Opciones","Foto","Nombre","Fecha del Paquete","Celular","Nivel"],
    dataRow: [],
    count: 0
  };
  query:any = {
    where:{ },
    page: 0
  };
  vista:string = "home";
  data:any = {};
  progreses:boolean = false;
  public count: number = 0;
  
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  query2:any = { 
    where:{ },
    limit: 1000,
    page: 0
  };

  constructor(
    private _user: UsuariosService,
    private _tools: ToolsService,
    private _userNivel: UserNivelService
  ) { }

  ngOnInit() {
    this.getRow();
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getRow();
     }
  }
   
  getRow(){
    this.progreses = true;
    this._user.get( this.query ).subscribe( async ( res:any ) =>{
      for( let row of res.data ) {
        let result:any = await this.getDetalles( row );
        if( !result ) continue; if( !result.nivel ) continue;
        row.fechadelpack = result.fechadelpack;
        row.nivel = result.nivel.nivel.title;
      }
      this.tablet.dataRow = _.unionBy( this.tablet.dataRow || [], res.data, 'id');
      this.tablet.count = res.count;
      this.progreses = false;
      // console.log( res );
    },( error:any )=> { this._tools.presentToast("Error de servidor"); this.progreses = false; });
  }

  getDetalles( item:any ){
    return new Promise( resolve =>{
      this._userNivel.getDetalles( { user: item.id } ).subscribe(( res:any )=>{
        // console.log( res );
        resolve( res );
      },( error:any )=> console.error( error ));
    });
  }

  verView( item:any ){
    this.vista = "detalle";
    this.data = item;
    this.query2.where = { cabeza: item.id, estado: "activo" };
    this.getUserCabeza();
  }

  getUserCabeza(){
    this._user.get( this.query2 ).subscribe((res:any)=>{
      // console.log( res );
      this.data.seguidores = res.data.length;
    })
  }
  
  cerrarDetalle(){
    this.vista = "home";
    this.data = {};
  }

}
