import { Component, OnInit } from '@angular/core';
import { BancosService } from 'src/app/servicesComponents/bancos.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ArchivosService } from 'src/app/servicesComponents/archivos.service';

@Component({
  selector: 'app-configurar-pagos',
  templateUrl: './configurar-pagos.component.html',
  styleUrls: ['./configurar-pagos.component.scss']
})
export class ConfigurarPagosComponent implements OnInit {
  
  data:any = {};
  disabled:boolean = false;

  constructor(
    private _bancos: BancosService,
    private _tools: ToolsService,
    private _archivos: ArchivosService
  ) { }

  ngOnInit() {
  }

  guardar(){
    let validador:boolean = this.validador();
    if( !validador ) return false;
    this.disabled = true;
    this._bancos.create( this.data ).subscribe(( res:any )=>{
      this.disabled = false;
      this._tools.tooast( { title: "Exitos Registrado" });
      this.data = { };
    },( error )=> { this.disabled = true; this._tools.tooast( { title: "Error de servidor", icon:"error"} ); });
  }

  validador(){
    if( !this.data.nombre ) { this._tools.tooast( { title: "Error falta el nombre", icon:"error"}); return false; }
    if( !this.data.nCedula ) { this._tools.tooast( { title: "Error falta el Numero de cedula", icon:"error"}); return false; }
    if( !this.data.nCelular ) { this._tools.tooast( { title: "Error falta el Numero Celular", icon:"error"}); return false; }
    if( !this.data.direccionDomicilio ) { this._tools.tooast( { title: "Error falta Direccion Domicilio", icon:"error"}); return false; }
    if( !this.data.tipoCuenta ) { this._tools.tooast( { title: "Error falta Tipo Cuenta", icon:"error"}); return false; }
    if( !this.data.nCuenta ) { this._tools.tooast( { title: "Error falta Numero Cuenta", icon:"error"}); return false; }
    if( !this.data.fotoCedula ) { this._tools.tooast( { title: "Error falta Foto de Cedula", icon:"error"}); return false; }
    return true;
  }

  async subirFile( ev:any ){
    this.data.fotoCedula = await this._archivos.getBase64( ev.target.files[0] );
    console.log( this.data );
  }

}
