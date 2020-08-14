import { Component, OnInit } from '@angular/core';
import { FleteService } from 'src/app/servicesComponents/flete.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-elaboracion-guias',
  templateUrl: './elaboracion-guias.component.html',
  styleUrls: ['./elaboracion-guias.component.scss']
})
export class ElaboracionGuiasComponent implements OnInit {
  data:any = {};
  tablet:any = {
    header: ["Opciones","Transp","Origen / Destino","Unid","Total Kilos","Kilos Vol","Valoración","Tray","Tipo envio","Flete x Kilo","Flete x Und","Flete Total","Manejo","Flete por Recaudo","Total","Tiempos Aprox"],
    listRow: []
  };
  progreses:boolean = false;
  btnDisabled:boolean = false;
  public count: number = 0;
  dataUser:any = {};
  constructor(
    private _flete: FleteService,
    private _tools: ToolsService
  ) { }

  ngOnInit() {
  }

  submitCotizar(){
    this._flete.fleteCotizar( this.data ).subscribe( ( res:any )=>{
      console.log( res );
      for( let row of res.data ){
        this.tablet.listRow.push({
          imgTrasp: "https://aveonline.co/app/temas/imagen_transpo/104926-1-tcc.jpg",
          origenDestino: this.data.ciudadOrigen + this.data.ciudadDestino,
          unida: row.total[0].totalunidades[0],
          totalKilos: row.total[0].totalpesoreal[0],
          kilosVol: row.total[0].totalpesovolumen[0],
          valoracion: "nacional",
          tray: "mensajeria",
          tipoEnvio: "",
          fleteKilo: "$ 0.00 Cobro a Dest:",
          fleteUnidad: "$ 0.00 Cobro a Dest:",
          fleteTotal: "$ 0.00 Cobro a Dest:"+row.total[0].valortarifa[0],
          manejo: "$0,000 Cobro a Dest: $ 0.00",
          fleteRecaudo: "",
          total: row.total[0].totaldespacho[0],
          tiempoEstimado: "7 Dias"
        });
      }
    } ,(error) => this._tools.tooast( { title:"Error en el servidor por favor reintenta!"}));
  }

  selectTrans( item ){
    this.data.transportadoraSelect = "TCC";
  }

  generarGuia(){

  }

}
