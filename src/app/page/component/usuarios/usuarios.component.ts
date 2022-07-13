import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import * as _ from 'lodash';

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

  constructor(
    private _user: UsuariosService
  ) { }

  ngOnInit() {
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

   verUser( item ){
    console.log( item );
    window.open( `${ this.urlFront }/dashboard/formUsuario/${ item.id }`, "Detalles Recogia", "width=940, height=600");
   }

}
