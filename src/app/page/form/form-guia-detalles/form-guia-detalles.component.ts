import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';
import { DANEGROUP } from 'src/app/JSON/dane-nogroup';

@Component({
  selector: 'app-form-guia-detalles',
  templateUrl: './form-guia-detalles.component.html',
  styleUrls: ['./form-guia-detalles.component.scss']
})
export class FormGuiaDetallesComponent implements OnInit {
  
  id:any;
  data:any = {};
  listCiudades:any = DANEGROUP;

  constructor(
    private activate: ActivatedRoute,
    private _flete: FleteService,
    private _tools: ToolsService
  ) { }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getFlete();
  }

  getFlete(){
    this._flete.get( { where: { /*id: this.id*/ } } ).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res ) return false;
      this.data = res;
      this.data.ciudadOrigen = ( this.listCiudades.find(( item:any )=> item.code == this.data.ciudadOrigen ).city ) || 'null';
      this.data.ciudadDestino = ( this.listCiudades.find(( item:any )=> item.code == this.data.ciudadDestinatario ).city ) || 'null';
      console.log( this.data );
    },( error )=> this._tools.tooast( { title: "Error de servidor"} ) );
  }

}
