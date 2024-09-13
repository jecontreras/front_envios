import { Component, OnInit } from '@angular/core';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import * as moment  from 'moment';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
      /*solicitudFecha:{
        "<=": moment(  ).format("YYYY-MM-DD"),
        ">=": ( moment(  ).add( -1, 'days') ).format("YYYY-MM-DD"),
      },*/
      solicitudFecha: moment(  ).format("YYYY-MM-DD"),
      state: 0
    },
    sort: "createdAt ASC",
    limit: -1,
    page: 0
  };
  data:any = {
    plataforma: "INTERRAPIDISIMO",
    fecha1: moment().add(-1,'day').format("DD/MM/YYYY"),
    fecha2: moment().format("DD/MM/YYYY")
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
  listUser:any = [];
  keyword = 'username';

  constructor(
    private _flete: FleteService,
    public _tools: ToolsService,
    private _store: Store<STORAGES>,
    private _user: UsuariosService
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
    this.getAgente();
  }

  getAgente(){
    this._user.get( { where: { }, limit: 100000 } ).subscribe(res=>{
      this.listUser = res.data;
    })
  }

  handleClean(){
    delete this.query.where.user;
    this.query.page = 0;
    this.listRow = [];
    if( this.rolName !== 'admin' ) this.query.where.user = this.dataUser.id;
    this.getRow();
  }

  selectEvent(ev:any){
    console.log("***", ev)
    if( ev.id ) this.query.where.user = ev.id;
    this.query.page = 0;
    this.listRow = [];
    this.getRow();
  }

  async filtroGet(){
    this.listDistribucion = [];
    if( this.data.fecha1 && this.data.fecha2 ){
      this.query.where.solicitudFecha = {
        ">=": moment( this.data.fecha1 ).format("YYYY-MM-DD"),
        "<=": moment( this.data.fecha2 ).format("YYYY-MM-DD"),
      };
    }else delete this.query.where.solicitudFecha;
    await this.getRow();

  }

  getRow(){
    return new Promise(resolve =>{
      let count = 0;

      if( this.data.plataforma == 'TODO' ) delete this.query.where.transportadoraSelect;
      else this.query.where.transportadoraSelect = this.data.plataforma;
      //console.log(this.query)
      this._flete.get( this.query ).subscribe( async ( res:any )=>{
        //console.log("***", res)
        this.total = {
          unidad: 0,
          peso: 0,
          volumen: 0,
          totalValorMercancia: 0,
          flteTotal: 0,
          cantidadItem: 0
        };
        for( let row of res.data ){
          row.check = false;
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
        resolve( true );
      },()=>resolve(false) );
    })
  }

  handleCheck(){
    for( let row of this.listRow ) row.check = this.data.check;
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
    if( ( this.data.plataforma != 'INTERRAPIDISIMO' ) && ( this.data.plataforma != 'SERVIENTREGA' ) ) return this._tools.print();
    if( this.data.plataforma == 'INTERRAPIDISIMO'){
      let filter = this.listRow.filter(( item )=> item.check == true );
      filter = _.map( filter, 'nRemesa');
       this.getRelationshipInter( filter );
    }
    if( this.data.plataforma == 'SERVIENTREGA'){
      let filter = this.listRow.filter(( item )=> item.check == true );
      filter = _.map( filter, 'nRemesa');
       this.getRelationshipServientrega( filter );
    }
  }

  getRelationshipInter(IdFletes){
    this._flete.relationshipInter( { idFletes: IdFletes } ).subscribe( (res)=>{
      if( res.data.arregloBytesPlanilla ) this._tools.downloadPdf( res.data.arregloBytesPlanilla, 'INTERRAPIDISIMO #'+ res.data.numeroPlanilla  );
      else this._tools.tooast( { title: "Lo sentimos Problemas de generador de relacion de despacho" } );
    })
  }

  getRelationshipServientrega(IdFletes){
    this._flete.relationshipInter( { idFletes: IdFletes } ).subscribe( (res)=>{
      if( res.data.arregloBytesPlanilla ) this._tools.downloadPdf( res.data.arregloBytesPlanilla, 'SERVIENTREGA #'+ res.data.numeroPlanilla  );
      else this._tools.tooast( { title: "Lo sentimos Problemas de generador de relacion de despacho" } );
    })
  }



}
