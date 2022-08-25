import { Component, OnInit } from '@angular/core';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import { DANECOR } from 'src/app/JSON/daneCordinadora';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CiudadesService } from 'src/app/servicesComponents/ciudades.service';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';

@Component({
  selector: 'app-elaboracion-guias',
  templateUrl: './elaboracion-guias.component.html',
  styleUrls: ['./elaboracion-guias.component.scss']
})
export class ElaboracionGuiasComponent implements OnInit {
  data:any = {
    transportadora: "envia",
    totalkilo: 1,
    volumenAlto: 9,
    volumenAncho: 21,
    volumenLargo: 28,
    valorAsegurado: 50000,
    valorRecaudar: 0,
    totalUnidad1: 1,
    totalUnidad: 1,
    pagaElEnvio: 0,
    contenido: ""
  };
  tablet:any = {
    header: ["Opciones","Transp","Origen / Destino","Unid","Total Kilos","Kilos Vol","Valoración","Tray","Flete","Flete Manejo","Valor Tarifa","Total","Tiempos Aprox"],
    listRow: []
  };
  progreses:boolean = false;
  btnDisabled:boolean = false;
  public count: number = 0;
  dataUser:any = {};
  listCiudades:any = DANEGROUP;
  listCiudades2:any = DANECOR;
  keyword = 'name';
  keyword2 = 'nombre';
  mensaje:string;
  errorCotisa:string;
  urlFront:string = window.location.origin;
  opcionCurrencys:any;

  constructor(
    private _flete: FleteService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
    private _ciudades: CiudadesService,
    private _user: UsuariosService
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
    this.getCiudades();
    this.opcionCurrencys = this._tools.currency;
  }

  armandoData(){
    this.data = {
      paisOrigen: "colombia",
      tipoEnvio: "nacionales",
      ciudadOrigen: this.dataUser.codigoCiudad,
      ciudadOrigenText: this.dataUser.ciudad,
      paisDestino: "colombia",
      seleccionAgente: `${ this.dataUser.name } `,
      remitenteNombre: `${ this.dataUser.name } `,
      remitenteDireccion:   this.dataUser.direccion,
      remitenteCorreo: this.dataUser.email,
      remitenteFijo: this.dataUser.telFijo,
      identificacionRemitente: this.dataUser.documento,
      remitenteCelular: this.dataUser.celular,
      remitenteBarrio: this.dataUser.barrio || "trigal",
      fechaRemesa: moment().format("YYYY-MM-DD"),
      selectEnvio: "contraEntrega",
      ... this.data
    };
    console.log( this.data)
  }

  getCiudades(){
    this._ciudades.get( { where: { }, limit: 10000000 } ).subscribe( ( res:any ) => {
      this.listCiudades = res.data;
    });
  }

  async procesosCiudades(){
    for( let row of this.listCiudades ){
      setInterval(async ()=>{
        let result =       await this.guardarCiudades( {
                code: row.code,
                city: row.city,
                state: row.state,
                name: row.name,
                nameDepartamento: row.city
              }
        );
      }, 3000 );
    }
  }

  guardarCiudades( data ){
    return new Promise( resolve =>{
      this._ciudades.create( data ).subscribe( ( res:any ) =>{
        resolve( true );
      },( resolve( false ) ));
    });
  }

  blurPlat(){
    this.data.ciudadDestino = "";
  }

  blurTipo(){
    this.tablet.listRow = [];
    this.data.valorRecaudar = 0;
  }

  submitCotizar(){

    this.tablet.listRow = [];
    console.log( this.data );
    let validador:boolean = this.validandoCotizador ();
    if( !validador ) return false;
    this.data.pesoVolumen = ( ( parseFloat( this.data.volumenAlto ) * parseFloat( this.data.volumenLargo ) * parseFloat( this.data.volumenAncho ) ) / 5000 ) || 1;
    this.data.pesoVolumen = Math.round( this.data.pesoVolumen );
    this.data.valorFactura = this.data.valorRecaudar;
    let destino = {
      code: this.data.ciudadDestino.codigo,
      name: this.data.ciudadDestino.nombre,
    };
    if( this.data.transportadora == 'envia'){
      destino = {
        code: this.data.ciudadDestino.code,
        name: this.data.ciudadDestino.name,
      };
    }
    let data = {
      selectEnvio: this.data.selectEnvio,
      idCiudadDestino: String( destino.code ),
      idCiudadOrigen: this.data.ciudadOrigen,
      valorMercancia: Number( this.data.valorRecaudar ),
      valorRecaudar: Number( this.data.valorRecaudar ),
      fechaRemesa: this.data.fechaRemesa,
      idUniSNegogocio: 1,
      numeroUnidad: Number( 1 || this.data.totalUnidad ),
      pesoReal: Number( this.data.totalkilo ),
      pesoVolumen: this.data.pesoVolumen || 1,
      alto: Number( this.data.volumenAlto ),
      largo: Number( this.data.volumenLargo ),
      ancho: Number( this.data.volumenAncho ),
      tipoEmpaque: "",
      drpCiudadOrigen: this.data.ciudadOrigen,
      txtIdentificacionDe: Number( this.data.identificacionRemitente ),
      txtTelefonoDe: Number( this.data.remitenteFijo ||  this.data.remitenteCelular ),
      txtDireccionDe: this.data.remitenteBarrio,
      txtCod_Postal_Rem: 54403,
      txtEMailRemitente: "joseeduar147@gmail.com",
      txtPara: "Victor moizes",
      txtIdentificacionPara: 98090871986,
      drpCiudadDestino: String(destino.name),
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
      valorAsegurado: this.data.valorAsegurado, //number
    };
    this.btnDisabled = true;
    this.errorCotisa = "";
    this.progreses = true;
    this._flete.fleteCotizar( data ).subscribe( ( res:any )=>{
      console.log( res );
      this.btnDisabled = false;
      this.progreses = false;
      if( res.data == "Error parametros incompleto") return this._tools.tooast( { title: res.data, icon: "error" } );
      this.armandoCotizacionTcc( res.data.tcc );
      this.armandoCotizacionEnvia( res.data.envia );
      this.armandoCotizacionCordinadora( res.data.cordinadora );
      this.data.codeDestino = res.data.idCiudadDestino;
      console.log( this.data, res.data.idCiudadDestino );
    } ,(error) => { this._tools.tooast( { title:"Error en el servidor por favor reintenta!", icon: "error" } ); this.btnDisabled = false; this.progreses = true;});

  }

  armandoCotizacionTcc( res:any ){
    let destino = {
      code: this.data.ciudadDestino.codigo,
      name: this.data.ciudadDestino.nombre,
    };
    if( this.data.transportadora == 'envia'){
      destino = {
        code: this.data.ciudadDestino.code,
        name: this.data.ciudadDestino.name,
      };
    }
    if( !res[6] ) { /*this.errorCotisa = `No hay cubrimiento enesta direccion ${ this.data.ciudadDestino.state }`;*/ return false; }
    if( res[6]['Total'] == 0 ) { /*this.errorCotisa = `No hay cubrimiento enesta direccion ${ this.data.ciudadDestino.state }`; */return false; }
    this.tablet.listRow.push({
      imgTrasp: "./assets/imagenes/tcc.png",
      origenDestino: `${ this.data.ciudadOrigenText } A ( ${ destino.name})` ,
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
      total: this._tools.monedaChange( 3, 2, ( Number( res[6]['Total'] ) || 0 ) ),
      totalSin: Number(  res[6]['Total'] ),
      tiempoEstimado: res[1]['Dias'],
      trasportadora: "TCC"
    });
  }

  armandoCotizacionEnvia( res:any ){
    let destino = {
      code: this.data.ciudadDestino.codigo,
      name: this.data.ciudadDestino.nombre,
    };
    if( this.data.transportadora == 'envia'){
      destino = {
        code: this.data.ciudadDestino.code,
        name: this.data.ciudadDestino.name,
      };
    }
    if( !res[6] ) { /*this.errorCotisa = `No hay cubrimiento enesta direccion ${ this.data.ciudadDestino.state }`;*/ return false; }
    if( res[6]['Total'] == 0 ) { /*this.errorCotisa = `No hay cubrimiento enesta direccion ${ this.data.ciudadDestino.state }`;*/ return false; }
    this.tablet.listRow.push({
      imgTrasp: "https://aveonline.co/app/temas/imagen_transpo/084935-1-envia-094632-1-ENVIA.jpg",
      origenDestino: `${ this.data.ciudadOrigenText } A ( ${ destino.name})` ,
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
      total: this._tools.monedaChange( 3, 2, ( Number( res[6]['Total'] ) + 1000 || 0 ) ),
      totalSin: Number(  res[6]['Total'] ) + 1000,
      tiempoEstimado: res[1]['Dias'],
      trasportadora: "ENVIA"
    });
  }

  armandoCotizacionCordinadora( res:any ){
    let destino = {
      code: this.data.ciudadDestino.codigo,
      name: this.data.ciudadDestino.nombre,
    };
    if( this.data.transportadora == 'envia'){
      destino = {
        code: this.data.ciudadDestino.code,
        name: this.data.ciudadDestino.name,
      };
    }
    if( !res[6] ) { /*this.errorCotisa = `No hay cubrimiento enesta direccion ${ this.data.ciudadDestino.state }`;*/ return false; }
    if( res[6]['Total'] == 0 ) { /*this.errorCotisa = `No hay cubrimiento enesta direccion ${ this.data.ciudadDestino.state }`; */return false; }
    this.tablet.listRow.push({
      imgTrasp: "./assets/imagenes/logoCordinadora.png",
      origenDestino: `${ this.data.ciudadOrigenText } A ( ${ destino.name})` ,
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
      total: this._tools.monedaChange( 3, 2, ( Number( res[6]['Total'] ) || 0 ) ),
      totalSin: Number(  res[6]['Total'] ),
      tiempoEstimado: res[1]['Dias'],
      trasportadora: "CORDINADORA"
    });
  }

  selectTrans( item ){
    this.data.transportadoraSelect = item.trasportadora;
    this.data.fleteValor = item.fleteSin;
    this.data.fleteManejo = item.fleteManejoSin;
    this.data.flteTotal = item.totalSin;
    for( let row of this.tablet.listRow ) row.check = false;
    item.check = !item.check;
  }

  async generarGuia(){
    let destino = {
      code: this.data.codeDestino || this.data.ciudadDestino.codigo,
      name: this.data.ciudadDestino.nombre,
    };
    if( this.data.transportadoraSelect == 'ENVIA'){
      destino = {
        code: this.data.ciudadDestino.code,
        name: this.data.ciudadDestino.name,
      };
    }
    let validador:boolean = this.valodandoGenerar();
    if( !validador ) return false;
    this.data.fechaRemesa = moment().format("YYYY-MM-DD");
    this.mensaje = "";
    this.btnDisabled = true;
    this.data.valorFactura = this.data.valorRecaudar;
    if( this.data.selectEnvio == 'contraEntrega' ) if( this.data.pagaElEnvio == 1 ) this.data.valorRecaudar = ( this.data.valorRecaudar || 0 ) + ( this.data.flteTotal || 0 );
    
    let data:any = {
      pagaElEnvio: this.data.pagaElEnvio,
      selectEnvio: this.data.selectEnvio,
      fleteValor: this.data.fleteValor,
      fleteManejo: this.data.fleteManejo,
      user: this.dataUser.id,
      codigo: this._tools.codigo(),
      flteTotal: this.data.flteTotal,
      solicitudFecha: this.data.fechaRemesa,
      solictudVentanaInicio: this.data.fechaRemesa,
      solictudVentanaFin: this.data.fechaRemesa,
      unidadNegocio: Number( 1 || this.data.totalUnidad ),
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
      ciudadDestinatario: /*11001000,*/ String( destino.code ),
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
      numeroBolsa: Number( this.data.numeroBolsa || 1 ),
      unidadesInternas: Number( 1 || this.data.totalUnidad ),
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
    window.document.scrollingElement.scrollTop=0
    this._tools.ProcessTime( { title: "Cargando por favor esperar", tiempo: 7000 } );
    if( this.data.transportadoraSelect == "TCC" ) await this.creandoGuiaTcc( data );
    else if( this.data.transportadoraSelect == "CORDINADORA") await this.creandoCordinadora( data );
    else { await this.creandoGuiaEnvia( data ); }
    this.crearCliente();

  }

  creandoGuiaTcc( data:any  ){
    return new Promise(resolve=>{
      this._flete.fleteCrearTcc( data ).subscribe((res:any)=>{
        console.log( res );
        this.btnDisabled = false;
        try {
          if( res.status !== 200){ this.mensaje = res.data.msx; this._tools.tooast( { title:"Error al generar la guia", icon: "error" } ); }
          else {
            this.mensaje= `ver guia ->>  ${this.urlFront}/dashboard/estadoGuias`;
            this._tools.tooast( { title:"Exitoso guia generada" } );
            this.data.id = res.data.msx.id;
          }
        } catch (error) {}
        resolve(res);
      },( error )=> { this._tools.tooast( { title:"Error en el servidor por favor reintenta!", icon: "error" } ); console.error( error ); this.btnDisabled = false; resolve( false )} );
    });
  }

  creandoGuiaEnvia( datable:any ){
    return new Promise(resolve=>{
      let data:any = {
        drpCiudadOrigen: ( this.listCiudades.find(( row:any )=> row.code == this.data.ciudadOrigen ) ).name,
        txtIdentificacionDe: this.data.identificacionRemitente,
        txtTelefonoDe: this.data.remitenteFijo,
        txtDireccionDe: this.data.remitenteDireccion,
        txtPara: this.data.destinatarioNombre,
        drpCiudadDestino: this.data.ciudadDestino.name,
        txtTelefonoPara: this.data.destinatarioCelular,
        txtDireccionPara: `${ this.data.destinatarioDireccion } ( ${ this.data.destinatarioBarrio } )`,
        txtUnidades: 1, //this.data.totalUnidad,
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
        resolve( res );
      },( error )=> { this._tools.tooast( { title:"Error en el servidor por favor reintenta!", icon: "error" } ); console.error( error ); this.btnDisabled = false; resolve( false );} );
    });
  }

  creandoCordinadora( datable:any ){
    return new Promise(resolve=>{
      let data:any = {
        drpCiudadOrigen: ( this.listCiudades.find(( row:any )=> row.code == this.data.ciudadOrigen ) ).name,
        txtIdentificacionDe: this.data.identificacionRemitente,
        txtTelefonoDe: this.data.remitenteFijo,
        txtDireccionDe: this.data.remitenteDireccion,
        txtPara: this.data.destinatarioNombre,
        drpCiudadDestino: this.data.ciudadDestino.name,
        txtTelefonoPara: this.data.destinatarioCelular,
        txtDireccionPara: `${ this.data.destinatarioDireccion } ( ${ this.data.destinatarioBarrio } )`,
        txtUnidades: 1, //this.data.totalUnidad,
        txtPeso: this.data.totalkilo,
        txtVolumen: this.data.pesoVolumen,
        txtDeclarado: this.data.valorFactura,
        txtValorRecaudo: this.data.valorRecaudar,
        txtDice: this.data.contenido,
        ... datable
      };
      this._flete.fleteCrearCordinadora( data ).subscribe( ( res:any )=>{
        this.btnDisabled = false;
        this.mensaje+= `ver guia ->>  ${this.urlFront}/dashboard/estadoGuias`;
        this._tools.tooast( { title:"Exitoso guia generada" } );
        if( res.data ) this.data.id = res.data.id;
        else this.data.id = res.id;
        resolve( res );
      },( error )=> { this._tools.tooast( { title:"Error en el servidor por favor reintenta!", icon: "error" } ); console.error( error ); this.btnDisabled = false; resolve( false );} );
    });
  }

  limpiar(){
    this.data = {
      transportadora: "envia",
      totalkilo: 1,
      volumenAlto: 9,
      volumenAncho: 21,
      volumenLargo: 28,
      valorAsegurado: 50000,
      valorRecaudar: 0,
      totalUnidad1: 1,
      totalUnidad: 1,
      pagaElEnvio: 0,
      contenido: ""
    };
    this.tablet.listRow = [];
    this.armandoData();
    window.document.scrollingElement.scrollTop=0
  }

  crear( obj:any ){

  }

  formula(){
    this.data.volumenAlto = this.data.volumenAlto * this.data.totalkilo;
    this.data.valorAsegurado = this.data.valorAsegurado * this.data.totalkilo;
    this.data.valorRecaudar = this.data.valorRecaudar * this.data.totalkilo;
  }

  crearCliente(){
    this._user.createCliente( {
      nombre: this.data.destinatarioNombre,
      apellido: "",
      Nidentificacion: this.data.destinatarioNitIdentificacion,
      Nwhatsaap: this.data.destinatarioCelular,
      direccionRecogida: this.data.destinatarioDireccion,
      barrio: this.data.destinatarioBarrio,
     } ).subscribe(( res:any )=>{ });
  }

  BuscarCliente(){
    if( !this.data.destinatarioNitIdentificacion ) return false;
    this._user.getCliente( { where: { Nidentificacion: this.data.destinatarioNitIdentificacion }}).subscribe( ( res:any )=>{
      res = res.data[0];
      if( !res ) return false;
      this.data.destinatarioNombre = res.nombre;
      this.data.destinatarioCelular = res.Nwhatsaap;
      this.data.destinatarioDireccion = res.direccionRecogida;
      this.data.destinatarioBarrio = res.barrio;
    })
  }

  validandoCotizador(){
    console.log( this.data )
    if( !this.data.ciudadDestino ) { this._tools.tooast({ title: "Error Falta ciudad de destino", icon: "error" } ); return false; }
    if( !this.data.ciudadOrigen ) { this._tools.tooast({ title: "Error Falta ciudad de origen", icon: "error" } ); return false; }
    if( this.data.selectEnvio == 'contraEntrega' ) if( !this.data.valorRecaudar ) { this._tools.tooast({ title: "Error Falta Valor recaudo", icon: "error" } ); return false; }
    if( !this.data.valorRecaudar ) this.data.valorRecaudar = 0;
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
    //if( !this.data.valorFactura ) { this._tools.tooast({ title: "Error Falta Valor de la factura", icon: "error" } ); return false; }
    if( !this.data.contenido ) { this._tools.tooast({ title: "Error Falta Contenido o dice tener", icon: "error" } ); return false; }
    if( !this.data.volumenAlto ) { this._tools.tooast({ title: "Error Falta Volumen alto", icon: "error" } ); return false; }
    if( !this.data.volumenLargo ) { this._tools.tooast({ title: "Error Falta Volumen largo", icon: "error" } ); return false; }
    if( !this.data.volumenAncho ) { this._tools.tooast({ title: "Error Falta Volumen ancho", icon: "error" } ); return false; }
    //if( !this.data.numeroBolsa ) { this._tools.tooast({ title: "Error Falta Numero de bolsa", icon: "error" } ); return false; }
    if( !this.data.totalUnidad ) { this._tools.tooast({ title: "Error Falta Total unidad", icon: "error" } ); return false; }
    return true;
  }

}
