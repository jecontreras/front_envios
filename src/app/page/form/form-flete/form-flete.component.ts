import { Component, OnInit } from '@angular/core';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-flete',
  templateUrl: './form-flete.component.html',
  styleUrls: ['./form-flete.component.scss']
})
export class FormFleteComponent implements OnInit {

  listBancos:any = [];
  data:any = {};
  id:any;
  
  constructor(
    private _flete: FleteService,
    private _Tools: ToolsService,
    private activate: ActivatedRoute,
    private Router: Router
  ) { }

  ngOnInit() {
    this.data = this.forMatoData();
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getRow();
  }

  getRow(){
    this._flete.get( { where: { id: this.id, estado: 0 }, limit: 1 }).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res ) return false;
      this.data = res;
    },( error ) =>{
      this._Tools.tooast( { title: "Error no podemos encontrar el flete"});
      setTimeout(()=> this.Router.navigate(["/dashboard/flete"]), 2000 );
    });
  }

  forMatoData(){
    return {
      clave: "CLIENTETCC608W3A61CJ",
      solicitudrecogida:{},
      unidadnegocio: "1",
      razonsocialremitente: "FD-MARKETPLACE",
      naturalezaremitente: "J",
      ciudadorigen: "",
      naturalezadestinatario: "N",
      ciudaddestinatario: "",
      unidad: {
        tipounidad: "TIPO_UND_PAQ",
        claseempaque: "CLEM_CAJA",
      },
      documentoreferencia:{
        tipodocumento: "FA",
        numerodocumento: "6384748458",
        fechadocumento: "6384748458"
      }
    };
  }

  submit(){
    if( this.id ) this.actualizando();
    else this.creando();
  }

  creando(){
    this._flete.create( this.data ).subscribe(( res:any )=>{
      this._Tools.tooast( { title: "Creado exitos"} );
      this.data.id = res.id;
    },(error)=> this._Tools.tooast( { title: "Error de servidor" } ) );
  }

  actualizando(){
    let data:any = _.omitBy(this.data, _.isNull);
    data = _.omit( this.data, [ 'user', 'createdAt', 'updatedAt' ] );
    this._flete.update( data ).subscribe(( res:any )=>{
      this._Tools.tooast( { title: "Actualizado exitos"} );
    },(error)=> this._Tools.tooast( { title: "Error de servidor" } ) );
  }

}
