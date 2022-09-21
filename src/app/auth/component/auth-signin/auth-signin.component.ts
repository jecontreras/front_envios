import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAction } from 'src/app/redux/app.actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  
  data:any = {};
  btnDisabled:boolean = false;
  id:any;

  constructor(
    private _user: UsuariosService,
    private _tools: ToolsService,
    private _store: Store<STORAGES>,
    private _router: Router,
    private _authSrvice: AuthService,
    private activate: ActivatedRoute,
  ) { 
    if (this._authSrvice.isLoggedIn()) {
      this._router.navigate(['/dashboard/elaboracionguias']);
    }
  }

  ngOnInit() {
    this.id = (this.activate.snapshot.paramMap.get('id'));
    console.log( "***id", this.id )
  }

  Pruebas(){
    this._user.get( { where:{ username: "jose" } } ).subscribe(( res:any )=> this.ProcesoStorages( { data: res.data[0]} ));
  }

  iniciar(){
    this.btnDisabled = true;
    let validando = this.validador();
    if( !validando ) return false;
    this._user.login(this.data).subscribe((res:any)=>{
      //this._tools.dismisPresent();
      console.log( res );
      this.btnDisabled = false;
      if(res.success){
        this.ProcesoStorages( res );
      }else{
        this.data.password = "";
        this._tools.tooast({ title:"Error de "+ res.message ,icon: "error" });
      }
    },(error)=>{
      this._tools.tooast( { title: "Error de servidor", icon: "error" } );
      this.btnDisabled = false;
    });
  }

  validador(){
    if( !this.data.username ) { this._tools.tooast({ title:"Ingresar su username",icon: "warning" }); return false; }
    if( !this.data.password ) { this._tools.tooast({ title:"Ingresar su Contreseña",icon: "warning" }); return false; }
    return true;
  }

  ProcesoStorages( res:any ){
    let accion:any = new UserAction(res.data, 'post');
    this._store.dispatch(accion);
    this._router.navigate(['/dashboard/elaboracionguias']);

    if( this.id == 1 ) window.close();
  }



}
