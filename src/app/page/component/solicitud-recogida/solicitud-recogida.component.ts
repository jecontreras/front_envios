import { Component, OnInit } from '@angular/core';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';
import { RecogiasService } from 'src/app/servicesComponents/recogias.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-solicitud-recogida',
  templateUrl: './solicitud-recogida.component.html',
  styleUrls: ['./solicitud-recogida.component.scss']
})
export class SolicitudRecogidaComponent implements OnInit {

  data:any = {
    txtFechaIni: "jueves,  20/08/2020"
  };
  listCiudades:any = DANEGROUP;
  keyword = 'city';
  btnDisabled:boolean = false;
  dataUser:any = {};
  
  constructor(
    private _recogias: RecogiasService,
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
    this.formData();
  }

  formData(){
    this.data = {
      txtNum_Cliente: this.dataUser.documento,
      txtNombreApellidoC: this.dataUser.name + " " + this.dataUser.lastname,
      txtHInicial: "08:00",
      txtHFinal: "14:00",
      ...this.data
    };
  }

  validarFecha(){
    let data = {
      txtFechaIni: this.data.txtFechaIni,
      drpCiudad: this.data.drpCiudad.name,
      txtNum_Cliente: this.data.txtNum_Cliente,
      txtNombreApellidoC: this.data.txtNombreApellidoC || "",
      txtHInicial: this.data.txtHInicial,
      txtHFinal: this.data.txtHFinal
    };
    if( !data.drpCiudad ) return false;
    if( this.btnDisabled ) return false;
    this.btnDisabled = true;
    this._recogias.consulfechas( data ).subscribe(( res:any )=>{
      this.btnDisabled = false;
      this.data.lblWarningFecha = res.data;
    },( error:any )=> { this._tools.tooast( { title:"Error en el servidor por favor reintenta!", icon: "error" } ); console.error( error ); this.btnDisabled = false; });
  }

  guardarBtn(){

  }

  limpiar(){

  }

}
