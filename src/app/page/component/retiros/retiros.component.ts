import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { RetirosService } from 'src/app/servicesComponents/retiros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.scss']
})
export class RetirosComponent implements OnInit {
  
  tablet:any = {
    dataHeader: ["Opciones","Codigo","Titulo","Cantidad","Estado","Tipo Banco","Creado"],
    dataRow: [],
    count: 0
  };
  query:any = {
    where:{ },
    sort: "createdAt DESC",
    page: 0
  };
  data:any = {};
  progreses:boolean = false;
  public count: number = 0;
  
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;

  constructor(
    private _tools: ToolsService,
    private _retiros: RetirosService,
    private Router: Router
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
    this._retiros.get( this.query ).subscribe( async ( res:any ) =>{
      
      this.tablet.dataRow = _.unionBy( this.tablet.dataRow || [], res.data, 'id');
      this.tablet.count = res.count;
      this.progreses = false;
      // console.log( res );
    },( error:any )=> { this._tools.presentToast("Error de servidor"); this.progreses = false; });
  }

  verView( item:any ){
    if( item ) this.Router.navigate( [ "dashboard/formretiros", item.id ] );
    else this.Router.navigate( [ "dashboard/formretiros" ] );
  }


}
