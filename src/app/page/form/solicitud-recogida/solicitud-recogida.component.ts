import { Component, OnInit } from '@angular/core';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import { RecogiasService } from 'src/app/servicesComponents/recogias.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solicitud-recogida',
  templateUrl: './solicitud-recogida.component.html',
  styleUrls: ['./solicitud-recogida.component.scss']
})
export class SolicitudRecogidaComponent implements OnInit {

  data:any = {
    // txtFechaIni: "jueves,  20/08/2020"
  };
  listCiudades:any = DANEGROUP;
  keyword = 'city';
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
    else this.formData();
  }

  getFlete(){
    this._recogia.get( { where: { id: this.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res ) return false;
      this.data = res;
      this.data.drpCiudad = ( this.listCiudades.find(( item:any )=> item.code == this.data.drpCiudadTcc || item.name == this.data.drpCiudadEnvia ).city );
      console.log( this.data );
    },( error )=> this._tools.tooast( { title: "Error de servidor"} ) );
  }

  formData(){
    this.data = {
      txtNum_Cliente: this.dataUser.documento,
      txtNombreApellidoC: this.dataUser.name + " " + this.dataUser.lastname,
      txtHInicial: "08:00",
      txtHFinal: "14:00",
      txtFechaIni: `${ moment().format("dddd") }, ${ moment().format("DD/MM/YYYY") }`,
      user: this.dataUser.id,
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
      txtHFinal: this.data.txtHFinal
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
    this.btnDisabled = true;
    let data:any = {
      ...this.data
    };
    data.drpCiudadTcc = this.data.drpCiudad.code;
    data.drpCiudadEnvia = this.data.drpCiudad.name;
    // console.log( data );
    this._recogias.createRecogia( data ).subscribe(( res:any )=>{
      this.btnDisabled = false;
      this._tools.tooast( { title: "Generado exitos" });
      this.data = {};
      setTimeout(()=> this.Router.navigate( ["/dashboard/listrecogia"] ), 2000 );
    },( error:any )=> { this._tools.tooast( { title: "Error"} ); this.btnDisabled = true; } );
  }

  limpiar(){

  }

}
