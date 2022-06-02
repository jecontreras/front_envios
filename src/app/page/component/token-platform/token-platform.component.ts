import { Component, OnInit } from '@angular/core';
import { TokenPlatformService } from 'src/app/servicesComponents/token-platform.service';
import { PlataformaService } from 'src/app/servicesComponents/plataforma.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-token-platform',
  templateUrl: './token-platform.component.html',
  styleUrls: ['./token-platform.component.scss']
})
export class TokenPlatformComponent implements OnInit {

  tablet:any = {
    header: [
              "Plataforma","__VIEWSTATE LIQUIDACION","__VIEWSTATE CREAR DESPACHOS","__VIEWSTATE ELIMINAR DESPACHOS", "URLTOKEN ELIMINAR DESPACHOS", "__VIEWSTATE CREAR RECOGIAS",
              "__VIEWSTATE CONSULTAR FECHAS RECOGIA","__VIEWSTATEGENERATOR","txtUsuario","Creado"
    ],
    listRow: []
  };
  tablet2:any = {
    header: [
              "Nombre", "Comision", "Typo de Impresion", "Creado"
    ],
    listRow: []
  };
  query:any = {

  };
  progreses:boolean = false;
  btnDisabled: boolean = false;
  ver:string = "B4C1394A"
  url:string;

  constructor(
    private _tokenPlatform: TokenPlatformService,
    private _tools: ToolsService,
    private _plataforma: PlataformaService
  ) { }

  ngOnInit() {
    this.getRow();
    this.getRowPlataforma();
    console.log(this.ver)
    this.url = "ScriptManager1=UpdatePanel1%7CbtnLiquidar&__EVENTTARGET=&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=";
  }

  getRow(){
    this.progreses = true;
    this._tokenPlatform.get( this.query ).subscribe(( res:any )=>{
      this.tablet.listRow = res.data;
      this.progreses = false;
    },( )=> this.progreses = false );
  }

  getRowPlataforma(){
    this.progreses = true;
    this._plataforma.get( this.query ).subscribe(( res:any )=>{
      this.tablet2.listRow = res.data;
      this.progreses = false;
    },( )=> this.progreses = false );
  }

  actualizar( opt:string, item:any ){
    let data:any = { id: item.id };
    data[opt] = item[opt];
    if( this.btnDisabled ) return false;
    this.btnDisabled = true;
    this._tokenPlatform.update( data ).subscribe(( res:any )=>{
      this._tools.tooast( { title: "Actualizado "+ opt });
      this.btnDisabled = false;
    },( )=> { this._tools.tooast( { title: "Error "+ opt, icon: "error" } ); this.btnDisabled=false; })
  }

  actualizarPlt( opt:string, item:any ){
    let data:any = { id: item.id };
    data[opt] = item[opt];
    if( this.btnDisabled ) return false;
    this.btnDisabled = true;
    this._plataforma.update( data ).subscribe(( res:any )=>{
      this._tools.tooast( { title: "Actualizado "+ opt });
      this.btnDisabled = false;
    },( )=> { this._tools.tooast( { title: "Error "+ opt, icon: "error" } ); this.btnDisabled=false; })
  }

}
