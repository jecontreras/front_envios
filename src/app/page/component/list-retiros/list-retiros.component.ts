import { Component, OnInit } from '@angular/core';
import { RetirosService } from 'src/app/servicesComponents/retiros.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-retiros',
  templateUrl: './list-retiros.component.html',
  styleUrls: ['./list-retiros.component.scss']
})
export class ListRetirosComponent implements OnInit {
  
  tablet:any = {
    header: ["Opciones","Estado","Usuario","Dinero a Retirar", "Dinero que pago de Flete", "Creado", "Descripcion"],
    listRow: []
  };
  public count: number = 0;
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  progreses:boolean = false;
  public query:any = {
    where:{ },
    sort: "createdAt DESC",
    page: 0
   };
   urlFront:string = window.location.origin;

  constructor(
    private _retiros: RetirosService
  ) { }

  ngOnInit() {
    this.getRow();
  }

  getRow(){
    this._retiros.get( this.query ).subscribe( ( res:any ) =>{
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

   detalles( item:any ){
    window.open( `${ this.urlFront }/dashboard/formRetiros/${ item.id || '' }`, "Ver detalles Retiros", "width=640, height=480");
   }

}
