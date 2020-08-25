import { Component, OnInit } from '@angular/core';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-elaboracion-guias',
  templateUrl: './elaboracion-guias.component.html',
  styleUrls: ['./elaboracion-guias.component.scss']
})
export class ElaboracionGuiasComponent implements OnInit {
  data:any = {};
  tablet:any = {
    header: ["Opciones","Transp","Origen / Destino","Unid","Total Kilos","Kilos Vol","Valoración","Tray","Flete","Flete Manejo","Valor Tarifa","Total","Tiempos Aprox"],
    listRow: []
  };
  progreses:boolean = false;
  btnDisabled:boolean = false;
  public count: number = 0;
  dataUser:any = {};
  listCiudades:any = DANEGROUP;
  keyword = 'city';
  mensaje:string;
  errorCotisa:string;
  urlFront:string = environment.urlFront;

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
      remitenteBarrio: this.dataUser.barrio || "trigal",
      fechaRemesa: moment().format("YYYY-MM-DD"),
      selectEnvio: "contraEntrega",
      ... this.data
    }
  }

  submitCotizar(){

    this.tablet.listRow = [];
    console.log( this.data );
    let validador:boolean = this.validandoCotizador ();
    if( !validador ) return false;
    this.data.pesoVolumen = ( ( parseFloat( this.data.volumenAlto ) * parseFloat( this.data.volumenLargo ) * parseFloat( this.data.volumenAncho ) ) / 5000 ) || 0;
    this.data.pesoVolumen = Math.round( this.data.pesoVolumen );
    this.data.valorFactura = this.data.valorRecaudar;
    let data = {
      selectEnvio: this.data.selectEnvio,
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
      tipoEmpaque: "",
      drpCiudadOrigen: ( this.listCiudades.find(( row:any )=> row.code == this.data.ciudadOrigen ) ).name,
      txtIdentificacionDe: Number( this.data.identificacionRemitente ),
      txtTelefonoDe: Number( this.data.remitenteFijo ||  this.data.remitenteCelular ),
      txtDireccionDe: this.data.remitenteBarrio,
      txtCod_Postal_Rem: 54403,
      txtEMailRemitente: "joseeduar147@gmail.com",
      txtPara: "Victor moizes",
      txtIdentificacionPara: 98090871986,
      drpCiudadDestino: this.data.ciudadDestino.name,
      txtTelefonoPara: 3228576900,
      txtDireccionPara: "calle 1",
      txtCod_Postal_Des: "",
      txtDice: this.data.contenido,
      txtNotas: "ok",
      txtAccion: "",
      txtEMailDestinatario: "joseeduar147@gmail.com",
      txtDoc1: "",
      txtDoc2: "",
      txtDoc3: "",
      txtFec_CitaPactada: "",
      txtFec_VenOrdenCompra: "",
      esGrabar: 0,
      lblMca_Cubicacion1: "",
      hiddenInputToUpdateATBuffer_CommonToolkitScripts: 1,
      txtGuia_a_Consultar: "",
    };
    this.btnDisabled = true;
    this.errorCotisa = "";
    this._flete.fleteCotizar( data ).subscribe( ( res:any )=>{
      console.log( res );
      this.btnDisabled = false;
      this.armandoCotizacionTcc( res.data.tcc );
      this.armandoCotizacionEnvia( res.data.envia );
    } ,(error) => { this._tools.tooast( { title:"Error en el servidor por favor reintenta!", icon: "error" } ); this.btnDisabled = false; });

  }

  armandoCotizacionTcc( res:any ){
    for( let row of res ){
      if( row['respuesta'][0]['codigo'][0] == -1 ) { this.errorCotisa = row['respuesta'][0]['mensaje'][0] + " Tcc"; return false;}
      this.tablet.listRow.push({
        imgTrasp: "https://aveonline.co/app/temas/imagen_transpo/104926-1-tcc.jpg",
        origenDestino: `${ this.data.ciudadOrigenText } ${ this.data.ciudadDestino.city } ( ${ this.data.ciudadDestino.state})` ,
        unida: row.total[0].totalunidades[0],
        totalKilos: row.total[0].totalpesoreal[0],
        kilosVol: parseInt(row.total[0].totalpesovolumen[0] || 0),
        valoracion: "nacional",
        tray: "mensajeria",
        flete: this._tools.monedaChange( 3, 2, ( row.subtotales[0]['ConceptoAgrupado'][0]['valor'][0] || 0 ) ),
        fleteSin: row.subtotales[0]['ConceptoAgrupado'][0]['valor'][0],
        fleteManejo: this._tools.monedaChange( 3, 2, ( row.subtotales[0]['ConceptoAgrupado'][1]['valor'][0] || 0 ) ),
        fleteManejoSin: row.subtotales[0]['ConceptoAgrupado'][1]['valor'][0],
        fleteTotal: this._tools.monedaChange( 3, 2, ( row.total[0].valortarifa[0] || 0 ) ),
        fleteTotalSin: row.total[0].valortarifa[0],
        total: this._tools.monedaChange( 3, 2, ( row.total[0].totaldespacho[0] || 0 ) ),
        totalSin: row.total[0].totaldespacho[0],
        tiempoEstimado: "7 Dias",
        trasportadora: "TCC"
      });
    }
  }

  armandoCotizacionEnvia( res:any ){
    if( res[6]['Total'] == 0 ) { this.errorCotisa = `No hay cubrimiento enesta direccion ${ this.data.ciudadDestino.state }`; return false; }
    this.tablet.listRow.push({
      imgTrasp: "https://aveonline.co/app/temas/imagen_transpo/084935-1-envia-094632-1-ENVIA.jpg",
      origenDestino: `${ this.data.ciudadOrigenText } ${ this.data.ciudadDestino.city } ( ${ this.data.ciudadDestino.state } )` ,
      unida: this.data.totalUnidad,
      totalKilos: res[2]["Peso a Cobrar"],
      kilosVol: this.data.pesoVolumen,
      valoracion: res[0]['Cubrimiento'],
      tray: "mensajeria",
      flete: this._tools.monedaChange( 3, 2, ( res[3]['Flete'] || 0 ) ),
      fleteSin: res[3]['Flete'],
      fleteManejo: this._tools.monedaChange( 3, 2, ( res[5]['Otros'] || 0 ) ),
      fleteManejoSin: res[5]['Otros'],
      fleteTotal: this._tools.monedaChange( 3, 2, ( res[4]['F.V.'] || 0 ) ),
      fleteTotalSin: res[4]['F.V.'],
      total: this._tools.monedaChange( 3, 2, ( res[6]['Total'] || 0 ) ),
      totalSin: res[6]['Total'],
      tiempoEstimado: res[1]['Dias'],
      trasportadora: "ENVIA"
    });
  }

  selectTrans( item ){
    this.data.transportadoraSelect = item.trasportadora;
    this.data.fleteValor = item.fleteSin;
    this.data.fleteManejo = item.fleteManejoSin;
    this.data.flteTotal = item.totalSin;
  }

  generarGuia(){
    let validador:boolean = this.valodandoGenerar();
    if( !validador ) return false;
    this.data.fechaRemesa = moment().format("YYYY-MM-DD");
    this.mensaje = "";
    this.btnDisabled = true;
    this.data.valorFactura = this.data.valorRecaudar;
    let data:any = {
      fleteValor: this.data.fleteValor,
      fleteManejo: this.data.fleteManejo,
      user: this.dataUser.id,
      codigo: this._tools.codigo(),
      flteTotal: this.data.flteTotal,
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
      telefonoRemitente: this.data.remitenteFijo || this.data.remitenteCelular,
      celularRemitente: this.data.remitenteCelular,
      ciudadOrigen: /*11001000,*/ Number( this.data.ciudadOrigen ),
      tipoIdentificacionDestinatario: "CC",
      identificacionDestinatario: Number( this.data.destinatarioNitIdentificacion ),
      nombreDestinatario: this.data.destinatarioNombre,
      razonsocialDestinatario: this.data.destinatarioNombre,
      direccionDestinatario: this.data.destinatarioDireccion,
      contactoDestinatario: this.data.destinatarioNombre,
      emailDestinatario: this.data.destinatarioCorreo,
      telefonoDestinatario: Number( this.data.destinatarioTelfijo || this.data.destinatarioCelular),
      celularDestinatario: Number( this.data.destinatarioCelular ),
      ciudadDestinatario: /*11001000,*/ Number( this.data.ciudadDestino.code ),
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
      fechaDocumento: this.data.destinatarioFechaExpedicion || "2019-10-10",
      tipoEnvio: this.data.tipoEnvio, // string
      seleccionAgente: this.data.seleccionAgente, // string
      paisOrigen: this.data.paisOrigen, // string
      paisDestino: this.data.paisDestino, // string
      valorAsegurado: this.data.valorAsegurado, //number
      numeroFactura: this.data.numeroFactura, //number
      flete: this.data.flete,  // boleando
      valorRecaudar: this.data.valorRecaudar,   //number
      destinatarioCosto: this.data.destinatarioCosto, // boleand
      remitenteBarrio: this.data.remitenteBarrio, // strint
      destinatarioFechaExpedicion: this.data.destinatarioFechaExpedicion, // strint
      destinatarioCelular: this.data.destinatarioCelular, // number
      vencimiento: this.data.vencimiento, // string
      referencia: this.data.referencia, //string
      observacionAdicional: this.data.observacionAdicional, //string
      transportadoraSelect: this.data.transportadoraSelect //string
    };

    if( this.data.transportadoraSelect == "TCC" ) this.creandoGuiaTcc( data );
    else this.creandoGuiaEnvia( data );
  }

  creandoGuiaTcc( data:any  ){
    this._flete.fleteCrearTcc( data ).subscribe((res:any)=>{
      console.log( res );
      this.btnDisabled = false;
      if( res.status !== 200){ this.mensaje = res.data.msx; this._tools.tooast( { title:"Error al generar la guia", icon: "error" } ); }
      else { 
        this.mensaje =  res.data.data['ns2:mensaje'][0];
        this.mensaje+= `ver guia ->>  ${this.urlFront}/dashboard/estadoGuias`;
        this._tools.tooast( { title:"Exitoso guia generada" } );
        this.data.id = res.data.msx.id;
      }
      
    },( error )=> { this._tools.tooast( { title:"Error en el servidor por favor reintenta!", icon: "error" } ); console.error( error ); this.btnDisabled = false; } );
  }

  creandoGuiaEnvia( datable:any ){
    let data:any = {
      drpCiudadOrigen: ( this.listCiudades.find(( row:any )=> row.code == this.data.ciudadOrigen ) ).name,
      txtIdentificacionDe: this.data.identificacionRemitente,
      txtTelefonoDe: this.data.remitenteFijo,
      txtDireccionDe: this.data.remitenteDireccion,
      txtPara: this.data.destinatarioNombre,
      drpCiudadDestino: this.data.ciudadDestino.name,
      txtTelefonoPara: this.data.destinatarioCelular,
      txtDireccionPara: `${ this.data.destinatarioDireccion } ( ${ this.data.destinatarioBarrio } )`,
      txtUnidades: this.data.totalUnidad,
      txtPeso: this.data.totalkilo,
      txtVolumen: this.data.pesoVolumen,
      txtDeclarado: this.data.valorFactura,
      txtValorRecaudo: this.data.valorRecaudar,
      txtDice: this.data.contenido,
      ... datable
    };
    this._flete.fleteCrearEnvia( data ).subscribe( ( res:any )=>{
      this.btnDisabled = false;
      this.mensaje+= `ver guia ->>  ${this.urlFront}/dashboard/estadoGuias`;
      this._tools.tooast( { title:"Exitoso guia generada" } );
      this.data.id = res.data.id;
    },( error )=> { this._tools.tooast( { title:"Error en el servidor por favor reintenta!", icon: "error" } ); console.error( error ); this.btnDisabled = false; } );
  }

  limpiar(){
    this.data = {};
    this.tablet.listRow = [];
    this.armandoData();
  }

  validandoCotizador(){
    if( !this.data.ciudadDestino ) { this._tools.tooast({ title: "Error Falta ciudad de destino", icon: "error" } ); return false; }
    if( !this.data.ciudadOrigen ) { this._tools.tooast({ title: "Error Falta ciudad de origen", icon: "error" } ); return false; }
    if( !this.data.valorRecaudar ) { this._tools.tooast({ title: "Error Falta Valor recaudo", icon: "error" } ); return false; }
    if( !this.data.totalUnidad ) { this._tools.tooast({ title: "Error Falta totalUnidad", icon: "error" } ); return false; }
    if( !this.data.totalkilo ) { this._tools.tooast({ title: "Error Falta Peso real", icon: "error" } ); return false; }
    if( !this.data.volumenAlto ) { this._tools.tooast({ title: "Error Falta Volumen alto", icon: "error" } ); return false; }
    if( !this.data.volumenLargo ) { this._tools.tooast({ title: "Error Falta Volumen largo", icon: "error" } ); return false; }
    if( !this.data.volumenAncho ) { this._tools.tooast({ title: "Error Falta Volumen ancho", icon: "error" } ); return false; }
    return true;
  }

  valodandoGenerar(){
    if( !this.data.totalUnidad ) { this._tools.tooast({ title: "Error Falta Total unidad", icon: "error" } ); return false; }
    if( !this.data.identificacionRemitente ) { this._tools.tooast({ title: "Error Falta Identificacion remitente", icon: "error" } ); return false; }
    if( !this.data.remitenteNombre ) { this._tools.tooast({ title: "Error Falta Remitente Nombre", icon: "error" } ); return false; }
    if( !this.data.remitenteDireccion ) { this._tools.tooast({ title: "Error Falta Remitente dirección", icon: "error" } ); return false; }
    if( !this.data.remitenteCelular ) { this._tools.tooast({ title: "Error Falta Celular", icon: "error" } ); return false; }
    if( !this.data.ciudadOrigen ) { this._tools.tooast({ title: "Error Falta Ciudad Origen", icon: "error" } ); return false; }
    if( !this.data.destinatarioNitIdentificacion ) { this._tools.tooast({ title: "Error Falta Destinatario nit Identificación", icon: "error" } ); return false; }
    if( !this.data.destinatarioNombre ) { this._tools.tooast({ title: "Error Falta Destinatario nombre", icon: "error" } ); return false; }
    if( !this.data.destinatarioDireccion ) { this._tools.tooast({ title: "Error Falta Destinatario Dirección", icon: "error" } ); return false; }
    if( !this.data.destinatarioCelular ) { this._tools.tooast({ title: "Error Falta Destinatario celular", icon: "error" } ); return false; }
    if( !this.data.ciudadDestino ) { this._tools.tooast({ title: "Error Falta Ciudad de destino", icon: "error" } ); return false; }
    if( !this.data.destinatarioBarrio ) { this._tools.tooast({ title: "Error Falta Destinatario barrio", icon: "error" } ); return false; }
    if( !this.data.totalkilo ) { this._tools.tooast({ title: "Error Falta Total de kilos", icon: "error" } ); return false; }
    if( !this.data.valorFactura ) { this._tools.tooast({ title: "Error Falta Valor de la factura", icon: "error" } ); return false; }
    if( !this.data.contenido ) { this._tools.tooast({ title: "Error Falta Contenido o dice tener", icon: "error" } ); return false; }
    if( !this.data.volumenAlto ) { this._tools.tooast({ title: "Error Falta Volumen alto", icon: "error" } ); return false; }
    if( !this.data.volumenLargo ) { this._tools.tooast({ title: "Error Falta Volumen largo", icon: "error" } ); return false; }
    if( !this.data.volumenAncho ) { this._tools.tooast({ title: "Error Falta Volumen ancho", icon: "error" } ); return false; }
    if( !this.data.numeroBolsa ) { this._tools.tooast({ title: "Error Falta Numero de bolsa", icon: "error" } ); return false; }
    if( !this.data.totalUnidad ) { this._tools.tooast({ title: "Error Falta Total unidad", icon: "error" } ); return false; }
    return true; 
  }

}
