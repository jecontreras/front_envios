import { Component, OnInit } from '@angular/core';
import { BancosService } from 'src/app/servicesComponents/bancos.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ArchivosService } from 'src/app/servicesComponents/archivos.service';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserAction } from 'src/app/redux/app.actions';
import { resolve } from 'url';

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
    private _archivos: ArchivosService,
    private _user: UsuariosService,
    private _store: Store<STORAGES>,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  async guardar(){
    let validador:boolean = this.validador();
    if( !validador ) return false;
    this.disabled = true;
    let data:any = {
      name: this.data.nombre,
      lastname: "",
      cabeza: "5f45e1add47fef29902f491c",
      username: this.data.email,
      email: this.data.email,
      indicativo: "57",
      celular: this.data.nCelular,
      password: this.data.nCelular,
      confirpassword: this.data.nCelular
    };
    let result:any = await this.createUser( data );
    if( !result ) return false;
    this.data.user = result.id;
    this._bancos.create( this.data ).subscribe( ( res:any )=>{
      this.disabled = false;
      this._tools.tooast( { title: "Exitoso Registrado recuerda que la clave es tu numero celular" });
      window.open(`https://web.whatsapp.com/send?phone=57${ this.data.nCelular }&text=${ encodeURIComponent(`Hola Usuario este es tu usuario para iniciar en la plataforma user: ${ this.data.email } password: ${ this.data.nCelular } `) } &source&data&app_absent`);
      this.data = { };
      setTimeout(()=> this._router.navigate(['/dashboard/perfil']), 5000 );
    },( error )=> { this.disabled = false; this._tools.tooast( { title: "Error de servidor", icon:"error"} ); });
  }

  createUser( data ){
    return new Promise( resolve =>{
      this._user.create( data ).subscribe(( res:any )=>{
        this.disabled = false;
        if( res.status != 200 ) { resolve( false );return this._tools.tooast( { title: "error "+ res.data, icon:"error" } );}
        else { this._tools.tooast( { title: "Felicitaciones te has registrado" } ); this.ProcesoStorages( res ); resolve( res.data ); }
      },( error:any )=>{
        console.log(error);
        this.disabled = false;
        this._tools.tooast( { title: "Error de servidor", icon:"error" } );
        resolve( false );
      });
    });
  }

  ProcesoStorages( res:any ){
    let accion:any = new UserAction(res.data, 'post');
    this._store.dispatch(accion);
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

  async subirFile( ev:any, opt:string ){
    // this.data[opt] = await this._archivos.getBase64( ev.target.files[0] );
    this.disabled = true;
    return new Promise( resolve => {
      let form: any = new FormData();
      form.append( 'file', ev.target.files[0] );
      this._tools.ProcessTime( { tiempo: 9900, title:"Espere un momento..." } );
      this._archivos.create(form).subscribe((res: any) => {
        //console.log(form);
        this._tools.tooast({ title: "subido foto "+ opt +" exitoso" });
        this.disabled = false;
        this.data[opt] = res.files;
        resolve( true );
      }, error => { this._tools.tooast({ title: "Subido Error", icon: "error" }); this.disabled = false; resolve( false ); })
    });
  }

}
