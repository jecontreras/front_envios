import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {
  
  data:any = {};
  disabled:boolean = false;
  ocultar:boolean = false;

  constructor(
    private _user: UsuariosService,
    private _tools: ToolsService,
    private Router: Router
  ) { }

  ngOnInit() {
  }

  accionCambiar(){
    if( this.disabled ) return false;
    this.disabled = true;
    this._user.cambiarContrasena( this.data ).subscribe(( res:any )=>{
      this._tools.tooast( { title: "Contraseña cambiada por favor revisar el correo electronico ", timer: 5000 } );
      this.disabled = false;
      this.ocultar = true;
      this.Router.navigate( ["/auth/login"] );
    },( error:any ) =>{ 
      console.log( error); 
      let errors = error.error.data || "";
      this._tools.tooast( { title: "Tenemos problemas con el restablecimiento de la contraseña "+ errors, icon: "error", timer: 5000 } ); this.disabled = false; } );
  }

}
