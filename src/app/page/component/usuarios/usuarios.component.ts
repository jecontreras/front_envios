import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  
  progreses:boolean = false;
  btnDisabled:boolean = false;
  public query:any = {
    where:{ 
      estado: ["activo", "verificando"]
    },
    sort: "createdAt DESC",
    page: 0
   };
  public count: number = 0;
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  tablet:any = {
    header: ["Opciones","Nombre","Email","telefono","Ciudad","direccion","Registrado"],
    listRow: []
  };
  urlFront:string = window.location.origin;
  filtro:any = {
    text: ""
  };

  constructor(
    private _user: UsuariosService,
    private _tools: ToolsService
  ) { }

  ngOnInit() {
    this.getRow();
  }

  filtroGet(){
    this.query.where.or = [
      {
        username: { contains: this.filtro.text } 
      },
      {
        name: { contains: this.filtro.text } 
      },
      {
        celular: { contains: this.filtro.text } 
      },
      {
        slug: { contains: this.filtro.text } 
      },
    ];
    this.query.page = 0;
    this.notscrolly = true;
    this.tablet.listRow = [];
    this.notEmptyPost = true;
    this.count = 0;
    this.getRow();
  }

  getRow(){
    this.progreses = true;
    if( this.tablet.listRow.length == 0 ) this.query.page = 0;
    this._user.get( this.query ).subscribe(( res:any )=>{
      this.tablet.listRow = _.unionBy(this.tablet.listRow || [], res.data, 'id');
      this.count = res.count;

      if (res.data.length === 0 ) {
        this.notEmptyPost =  false;
      }
      this.notscrolly = true;
      this.progreses = false;
    },(error)=> this.progreses = false );
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getRow();
     }
   }

   async updateUser( item ){
    let alerta = await this._tools.confirm({title:"Eliminar", detalle:"Deseas Eliminar Dato", confir:"Si Eliminar"} );
    if( !alerta.value ) return false;
    let data:any = {
      id: item.id,
      estado: "inactivo"
    }
    this._user.update( data ).subscribe( ( res:any )=>{
      this._tools.tooast( { title: "Usuario Borrado" } );
      this.tablet.listRow = _.filter( this.tablet.listRow, ( key:any )=> key.id != item.id );
    });
   }

   verUser( item ){
    console.log( item );
    window.open( `${ this.urlFront }/dashboard/formUsuario/${ item.id }`, "Detalles Recogia", "width=940, height=600");
   }

}
