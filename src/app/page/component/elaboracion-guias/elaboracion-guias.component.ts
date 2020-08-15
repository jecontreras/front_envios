import { Component, OnInit } from '@angular/core';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import * as moment from 'moment';

@Component({
  selector: 'app-elaboracion-guias',
  templateUrl: './elaboracion-guias.component.html',
  styleUrls: ['./elaboracion-guias.component.scss']
})
export class ElaboracionGuiasComponent implements OnInit {
  data:any = {};
  tablet:any = {
    header: ["Opciones","Transp","Origen / Destino","Unid","Total Kilos","Kilos Vol","Valoración","Tray","Flete","Flete Manejo","Flete Total","Total","Tiempos Aprox"],
    listRow: []
  };
  progreses:boolean = false;
  btnDisabled:boolean = false;
  public count: number = 0;
  dataUser:any = {};
  listCiudades:any = DANEGROUP;
  keyword = 'city';


  constructor(
    private _flete: FleteService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>
  ) {
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
   }

  ngOnInit() {
    this.armandoData();
  }

  armandoData(){
    this.data = { 
      paisOrigen: "colombia",
      tipoEnvio: "nacionales",
      ciudadOrigen: this.dataUser.codigoCiudad,
      ciudadOrigenText: this.dataUser.ciudad,
      paisDestino: "colombia",
      seleccionAgente: `${ this.dataUser.name } ${ ( this.dataUser.lastname || "men" ) }`,
      remitenteNombre: `${ this.dataUser.name } ${ ( this.dataUser.lastname || "men" ) }`,
      remitenteDireccion:   this.dataUser.direccion,
      remitenteCorreo: this.dataUser.email,
      remitenteFijo: this.dataUser.telFijo,
      identificacionRemitente: this.dataUser.documento,
      remitenteCelular: this.dataUser.celular,
      remitenteBarrio: this.dataUser.barrio,
      fechaRemesa: moment().format("YYYY-MM-DD"),
      ... this.data
    }
  }

  submitCotizar(){
    this.tablet.listRow = [];
    console.log( this.data );
    this.data.pesoVolumen = ( ( parseInt( this.data.volumenAlto ) * parseInt( this.data.volumenLargo ) * parseInt( this.data.volumenAncho ) ) / 166 ) || 0;
    this.data.pesoVolumen = parseInt( this.data.pesoVolumen );
    let data = {
      idCiudadDestino: this.data.ciudadDestino.code,
      idCiudadOrigen: this.data.ciudadOrigen,
      valorMercancia: Number( this.data.valorRecaudar ),
      fechaRemesa: this.data.fechaRemesa,
      idUniSNegogocio: 1,
      numeroUnidad: Number( this.data.totalUnidad ),
      pesoReal: Number( this.data.totalkilo ),
      pesoVolumen: this.data.pesoVolumen,
      alto: Number( this.data.volumenAlto ),
      largo: Number( this.data.volumenLargo ),
      ancho: Number( this.data.volumenAncho ),
      tipoEmpaque: ""
    };
    this._flete.fleteCotizar( data ).subscribe( ( res:any )=>{
      console.log( res );
      for( let row of res.data ){
        this.tablet.listRow.push({
          imgTrasp: "https://aveonline.co/app/temas/imagen_transpo/104926-1-tcc.jpg",
          origenDestino: `${ this.data.ciudadOrigenText } ${ this.data.ciudadDestino.city } ( ${ this.data.ciudadDestino.state})` ,
          unida: row.total[0].totalunidades[0],
          totalKilos: row.total[0].totalpesoreal[0],
          kilosVol: parseInt(row.total[0].totalpesovolumen[0] || 0),
          valoracion: "nacional",
          tray: "mensajeria",
          flete: this._tools.monedaChange( 3, 2, ( row.subtotales[0]['ConceptoAgrupado'][0]['valor'][0] || 0 ) ),
          fleteManejo: this._tools.monedaChange( 3, 2, ( row.subtotales[0]['ConceptoAgrupado'][1]['valor'][0] || 0 ) ),
          fleteTotal: this._tools.monedaChange( 3, 2, ( row.total[0].valortarifa[0] || 0 ) ),
          total: this._tools.monedaChange( 3, 2, ( row.total[0].totaldespacho[0] || 0 ) ),
          tiempoEstimado: "7 Dias"
        });
      }
    } ,(error) => this._tools.tooast( { title:"Error en el servidor por favor reintenta!"}));
  }

  selectTrans( item ){
    this.data.transportadoraSelect = "TCC";
  }

  generarGuia(){
    let data:any = {
      solicitudFecha: this.data.fechaRemesa,
      solictudVentanaInicio: this.data.fechaRemesa,
      solictudVentanaFin: this.data.fechaRemesa,
      unidadNegocio: Number( this.data.totalUnidad ),
      fechaDespacho: this.data.fechaRemesa,
      cuentaRemitente: 1422863,
      tipoIdentificacionRemitente: "CC",
      identificacionRemitente: Number( this.data.identificacionRemitente || 9999999 ),
      sedeRemitent: "",
      nombreRemitente: this.data.remitenteNombre,
      direccionCliente: this.data.remitenteDireccion,
      emailRemitente: this.data.remitenteCorreo,
      telefonoRemitente: this.data.remitenteFijo,
      ciudadOrigen: Number( this.data.ciudadOrigen ),
      tipoIdentificacionDestinatario: "CC",
      identificacionDestinatario: Number( this.data.destinatarioNitIdentificacion ),
      nombreDestinatario: this.data.destinatarioNombre,
      razonsocialDestinatario: this.data.destinatarioNombre,
      direccionDestinatario: this.data.destinatarioDireccion,
      contactoDestinatario: this.data.destinatarioNombre,
      emailDestinatario: this.data.destinatarioCorreo,
      telefonoDestinatario: Number( this.data.destinatarioTelfijo ),
      ciudadDestinatario: Number( this.data.ciudadDestino.code ),
      barrioDestinatario: this.data.destinatarioBarrio,
      totalPeso: Number( this.data.totalkilo ),
      totalPesovolumen: Number( this.data.pesoVolumen ),
      totalValorMercancia: Number( this.data.valorFactura ),
      observaciones: this.data.observacionAdicional || "",
      totalValorProducto: "",
      tipoUnidad: "TIPO_UND_PAQ",
      tipoEmpaque: "",
      claseEmpaque: "Bolsa",
      diceContener: this.data.contenido,
      kilosReales: Number( this.data.totalkilo ),
      largo: Number( this.data.volumenLargo ),
      alto: Number( this.data.volumenAlto ),
      ancho: Number( this.data.volumenAncho ),
      pesoVolumen: Number( this.data.pesoVolumen ),
      valorMercancia: Number( this.data.valorFactura ),
      numeroBolsa: Number( this.data.numeroBolsa ),
      unidadesInternas: Number( this.data.totalUnidad ),
      tipoDocumento: "CC",
      numeroDocumento: Number( this.data.destinatarioNitIdentificacion || 999999 ),
      fechaDocumento: this.data.destinatarioFechaExpedicion || "2019-10-10"
    };
    this._flete.fleteCrear( data ).subscribe((res:any)=>{
      console.log( res );
    },( error )=> { console.error( error ); });
  }

}
