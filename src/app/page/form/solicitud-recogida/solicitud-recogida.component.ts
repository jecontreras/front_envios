import { Component, OnInit } from '@angular/core';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import { RecogiasService } from 'src/app/servicesComponents/recogias.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { CiudadesService } from 'src/app/servicesComponents/ciudades.service';
import { CIUDADGRUP } from 'src/app/JSON/ciudadtcc';

@Component({
  selector: 'app-solicitud-recogida',
  templateUrl: './solicitud-recogida.component.html',
  styleUrls: ['./solicitud-recogida.component.scss']
})
export class SolicitudRecogidaComponent implements OnInit {

  data:any = {
    // txtFechaIni: "jueves,  20/08/2020"
    plataforma: 'cordinadora',
    fecha_recogida: new Date()
  };
  listCiudades:any = DANEGROUP;
  listCiudades2:any = CIUDADGRUP;
  keyword = 'name';
  keyword2 = 'municipio';
  btnDisabled:boolean = false;
  dataUser:any = {};
  id:any;

  constructor(
    private _recogias: RecogiasService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
    private activate: ActivatedRoute,
    private Router: Router,
    private _recogia: RecogiasService,
    private _ciudades: CiudadesService,
  ) {
      this._store.subscribe((store: any) => {
        //console.log(store);
        store = store.name;
        if(!store) return false;
        this.dataUser = store.user || {};
      });
  }

  ngOnInit() {
    moment.locale("es");
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getFlete();
    else {
      this.formData();
      this._tools.confirm( { title: "tener encuenta", confir:"continuar", detalle: "Por favor antes de continuar por favor comunicar con el servicio al cliente antes de solicitar una recogida +57 313 4453649"} );
    }
    this.getCiudades();
    //console.log(this.listCiudades2)
  }

  getFlete(){
    this._recogia.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res ) return false;
      this.data = res;
      this.data.drpCiudad = ( this.listCiudades.find(( item:any )=> item.code == this.data.drpCiudadTcc || item.name == this.data.drpCiudadEnvia ).city );
      console.log( this.data );
    },( error )=> this._tools.tooast( { title: "Error de servidor", icon:"error"} ) );
  }

  getCiudades(){
    this._ciudades.get( { where: { }, limit: 10000000 } ).subscribe( ( res:any ) => {
      this.listCiudades = res.data;
    });
  }


  formData(){
    this.data = {
      txtNum_Cliente: this.dataUser.documento,
      txtNombreApellidoC: this.dataUser.name + " " + this.dataUser.lastname,
      txtDir_Cliente: this.dataUser.direccion + " Barrio " + this.dataUser.barrio,
      txtHInicial: "08:00",
      txtHFinal: "14:00",
      txtFechaIni: `${ moment().format("dddd") }, ${ moment().format("DD/MM/YYYY") }`,
      user: this.dataUser.id,
      selectEnvio: "contraEntrega",
      ...this.data
    };
    console.log( this.data );
  }

  validarFecha(){
    setTimeout( ()=> this.getValidarFecha(), 2000 );
  }

  getValidarFecha(){
    let data = {
      txtFechaIni: this.data.txtFechaIni,
      drpCiudad: this.data.drpCiudad.name,
      txtNum_Cliente: this.data.txtNum_Cliente,
      txtNombreApellidoC: this.data.txtNombreApellidoC || "",
      txtHInicial: this.data.txtHInicial,
      txtHFinal: this.data.txtHFinal,
      selectEnvio: this.data.selectEnvio
    };
    console.log( data );
    if( !data.drpCiudad ) return false;
    if( this.btnDisabled ) return false;
    this.btnDisabled = true;
    this._recogias.consulfechas( data ).subscribe(( res:any )=>{
      this.btnDisabled = false;
      this.data.lblWarningFecha = res.data;
    },( error:any )=> { this._tools.tooast( { title:"Error en el servidor por favor reintenta!", icon: "error" } ); console.error( error ); this.btnDisabled = false; });
  }

  guardarBtn(){
    let data:any = {
      ...this.data
    };
    if( this.btnDisabled === true ) return false;
    data.drpCiudadTcc = this.data.drpCiudad.code;
    data.sionCiudadTcc = this.data.drpCiudad.id;
    data.drpCiudadEnvia = this.data.drpCiudad.name;
    data.drpDaneTcc = this.data.drpCiudad.dane;
    if( !data.drpCiudadEnvia ) return this._tools.tooast({ title:"Error no selecciono ninguna ciudad", icon: "error"});
    this.btnDisabled = true;
    console.log( data );
    this._recogias.createRecogia( data ).subscribe(( res:any )=>{
      console.log("********130", res)
      this.btnDisabled = false;
      if( !res.id ) return this._tools.tooast({icon: "error", title:"Error al crear la recogida"})
      this._tools.tooast( { title: "Generado exitos" });
      this.openWhatSapp();
      this.data = {};
      setTimeout(()=> this.Router.navigate( ["/dashboard/listrecogia"] ), 2000 );
    },( error:any )=> { this._tools.tooast( { title: "Error", icon: "error"} ); this.btnDisabled = false; } );
  }

  openWhatSapp(){
    window.open(`https://web.whatsapp.com/send?phone=573134453649&text=${ encodeURIComponent(`Hola Servicio al cliente en estos momento solicitud una solicitud de recogia soy usuario ${ this.dataUser.username } Email ${ this.dataUser.email } `) }&source&data&app_absent`);
  }

  limpiar(){

  }
  onChangeSearch( evt:any ){
    console.log("*********", evt)
    this.data.drpCiudad = {
      code: evt.id,
      name: evt.ciudad,
      codeDane: evt.dane
    };
  }

}
