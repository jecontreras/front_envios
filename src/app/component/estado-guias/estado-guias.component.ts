import { Component, OnInit } from '@angular/core';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import { ActivatedRoute } from '@angular/router';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-estado-guias',
  templateUrl: './estado-guias.component.html',
  styleUrls: ['./estado-guias.component.scss']
})
export class EstadoGuiasComponent implements OnInit {

  id:any;
  data:any = {};
  listCiudades:any = DANEGROUP;
  query:any = { where: {  }, limit: 1 };
  progreses:boolean = false;

  constructor(
    private activate: ActivatedRoute,
    private _flete: FleteService,
    private _tools: ToolsService
  ) { }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) { this.query.id = this.id; this.getFlete();}
    // console.log( this.id );
  }

  buscarGuia(){
    delete this.query.where.id;
    this.query.where.nRemesa = this.data.nRemesa;
    this.data = {};
    this.getFlete();
  }

  getFlete(){
    this.progreses = true;
    this._flete.getGuia( this.query ).subscribe(( res:any )=>{
      res = res.data[0];
      this.progreses = false;
      if( !res ) return false;
      this.data = res;
      console.log( this.data );
      if( !res.memosac ){
        this.data.ciudadOrigen = ( this.listCiudades.find(( item:any )=> item.code == this.data.ciudadOrigen ).city ) || 'null';
        this.data.ciudadDestino = ( this.listCiudades.find(( item:any )=> item.code == this.data.ciudadDestinatario ).city ) || 'null';
      }
      // console.log( this.data );
    },( error )=> { this._tools.tooast( { title: "Error de servidor"} ); this.progreses = false; } );
  }

}