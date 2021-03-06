import { Component, OnInit } from '@angular/core';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import * as moment  from 'moment';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-relacion-despacho',
  templateUrl: './relacion-despacho.component.html',
  styleUrls: ['./relacion-despacho.component.scss']
})
export class RelacionDespachoComponent implements OnInit {
  
  listRow:any = [];
  public query:any = { 
    where:{
      // estado: "GENERADA" 
      state: 0
    }, 
    sort: "createdAt ASC",
    limit: -1,
    page: 0
  };
  listCiudad:any = DANEGROUP;
  total:any = {
    unidad: 0,
    peso: 0,
    volumen: 0,
    totalValorMercancia: 0,
    flteTotal: 0,
    cantidadItem: 0
  };
  listDistribucion:any = [];
  infoInit:any = {
    ciudad: " CUCUTA-NORTE DE SANTANDER",
    cc: "1093753373-2",
    fecha: moment().format("DD/MM/YYYY"),
    direccion: "MANZANA 6 LOTE 27 BARRIO TUCUNARE PARTE ALTA",
    tel: 3154074456,
  };
  dataUser:any = {};
  rolName:string = "";
  constructor(
    private _flete: FleteService,
    public _tools: ToolsService,
    private _store: Store<STORAGES>
  ) { 
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
      if( Object.keys( this.dataUser ).length > 0 ) this.rolName = this.dataUser.rol.nombre;
      if( this.rolName !== 'admin' ) this.query.where.user = this.dataUser.id;
    });
  }

  ngOnInit() {
    this.getRow();
  }

  getRow(){
    let count = 0;
    this._flete.get( this.query ).subscribe( async ( res:any )=>{
      for( let row of res.data ){
        count++;
        row.count = count;
        row.ciudadDestinatarioText = row.drpCiudadDestino;
        row.ciudadOrigenText = row.drpCiudadOrigen;
        this.total.unidad+=row.unidadNegocio;
        this.total.peso+=row.totalPeso;
        this.total.volumen+=row.totalPesovolumen;
        this.total.totalValorMercancia+=row.totalValorMercancia;
        this.total.flteTotal+= row.flteTotal;
        this.total.cantidadItem++;
        await this.procesoDistribucion(row);
      }
      this.listRow = res.data;
      if( Object.keys( this.listRow ).length == 0 ) this._tools.tooast( { title: "Lo sentimos no tienes guias disponibles"})
    });
  }

  procesoDistribucion( row:any ){
    return new Promise( resolve =>{
      let filtro:any = _.findIndex( this.listDistribucion, { 'name': row.ciudadDestinatarioText } );
      // console.log( "***",filtro )
      if( filtro == -1 ) {
        this.listDistribucion.push( 
          {
            name: row.ciudadDestinatarioText,
            item: 1,
            unds: row.unidadNegocio,
            docEnter: 1,
            docDev: 0
          }
        );
      }else {
        let data:any = this.listDistribucion[filtro];
        data.item++;
        data.unds+= row.unidadNegocio;
        data.docEnter++;
        this.listDistribucion[filtro] = data;
      }
      resolve(true);
    });
  }

  openImprimir(){
    window.print();
  }

}
