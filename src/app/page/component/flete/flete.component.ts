import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flete',
  templateUrl: './flete.component.html',
  styleUrls: ['./flete.component.scss']
})
export class FleteComponent implements OnInit {

  listBancos:any = [];
  data:any = {};

  constructor() { }

  ngOnInit() {
    this.data = this.forMatoData();
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

}
