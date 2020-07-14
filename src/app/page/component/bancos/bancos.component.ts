import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { BancosService } from 'src/app/servicesComponents/bancos.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.scss']
})
export class BancosComponent implements OnInit {

  tablet:any = {
    dataHeader: ["Opciones","Banco","	Numero de La Cuenta","Tipo de Cuenta","Creado"],
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
    private _bancos: BancosService
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
    this._bancos.get( this.query ).subscribe( async ( res:any ) =>{
      
      this.tablet.dataRow = _.unionBy( this.tablet.dataRow || [], res.data, 'id');
      this.tablet.count = res.count;
      this.progreses = false;
      // console.log( res );
    },( error:any )=> { this._tools.presentToast("Error de servidor"); this.progreses = false; });
  }

  verView( item:any ){
    
  }


}
