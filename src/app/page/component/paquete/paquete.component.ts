import { Component, OnInit } from '@angular/core';
import { PaquetesService } from 'src/app/servicesComponents/paquetes.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss']
})
export class PaqueteComponent implements OnInit {
  
  listPaquetes:any = [];
  query:any = {
    where: {
      estado: "activo"
    },
    sort: "createdAt ASC",
    page: 0,
    limit: 10
  };
  formatoMoneda:any = {};

  constructor(
    private _paquetes: PaquetesService,
    private _tools: ToolsService
  ) { }

  ngOnInit() {
    this.formatoMoneda = this._tools.formatoMoneda;
    this.getPaquetes();
  }

  getPaquetes(){
    this._paquetes.get( this.query ).subscribe(( res:any )=>{
      this.listPaquetes = res.data;
      for( let row of this.listPaquetes ) row.valorTransaccion = 3000;
    });
  }

  openPaquete( item:any ){
    window.open( item.url );
  }

}
