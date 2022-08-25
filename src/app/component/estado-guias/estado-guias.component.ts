import { Component, OnInit } from '@angular/core';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import { ActivatedRoute } from '@angular/router';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';

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
    public _tools: ToolsService
  ) { }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) { this.query.where.nRemesa = this.id; this.getFlete();}
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
      this.data = res.guia;
      this.data.estadosName = this.data.estado;
      try {
        this.data.listEstadoSimple = res.simple[0].estado[0];
        this.data.listEstadoDetallado = _.orderBy( res.detallado[0].estado, ['codigo'], ['desc'] );
        this.data.estadosName = res.simple[0].estado[0].descripcion;
      } catch (error) { console.log("********", error )}
      try { this.data.estadoDetallado = res.simple[0].novedad[0].descripcion; } catch (error) { }
      console.log( this.data );
      if( !res.memosac ){
        this.data.ciudadOrigen = ( this.listCiudades.find(( item:any )=> item.code == this.data.ciudadOrigen ).city ) || 'null';
        this.data.ciudadDestino = ( this.listCiudades.find(( item:any )=> item.code == this.data.ciudadDestinatario ).city ) || 'null';
      }
      // console.log( this.data );
    },( error )=> { this._tools.tooast( { title: "Error de servidor"} ); this.progreses = false; } );
  }

  descargar( data:any ){
    if( data.transportadoraSelect === "CORDINADORA" ) this._tools.downloadIMG( data.tiket );
    else window.open( data.tiket )
  }

}
