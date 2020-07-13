import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsuariosService } from '../servicesComponents/usuarios.service';
import { UserAction } from '../redux/app.actions';
import { STORAGES } from '../interfaces/sotarage';

export interface User {
  heroesUrl: string;
  textfile: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  dataUser:any = {};
  constructor(private http: HttpClient, private router: Router, private _store: Store<STORAGES>, private _user: UsuariosService) {
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};
    });
      
  }

  deleteStorages(){
    let accion = new UserAction( this.dataUser, 'drop');
    this._store.dispatch(accion);
    // accion = new TokenAction( this.dataUser, 'drop');
    // this._store.dispatch(accion);
    localStorage.removeItem('user');
    location.reload();
  }

  pushStorages(){
    let accion = new UserAction( this.dataUser, 'put');
    this._store.dispatch(accion);
  }

  getToken(){

  }

   private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLogged() {
        if (!localStorage.getItem('user')) {
          this.router.navigate(['/auth/login']);
        } else {
          return false;
        }
    }

    public isLoggedIn() {
      if (Object.keys(this.dataUser).length === 0) {
        return false;
      } else {
        return true;
      }
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
    canActivate() {
      const identity = this.dataUser || {};
      //console.log(identity)
      if (Object.keys(identity).length >0) {
        this.validandoUser();
        (async ()=>{
          while (true){
            await this.sleep(300);
            this.validandoUser()
          }
        });
        return true;
      } else {
        this.router.navigate(['auth/login']);
        return false;
      }
    }
    urlreturn(splice, identity){
      if(splice){
        if (identity) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }
    }
    async sleep(segundos) {
      return new Promise(resolve => {
        setTimeout(async () => { resolve(true) }, segundos * 1000)
      })
    }
    validandoUser(){
      this._user.get({ where: { id: this.dataUser.id }}).subscribe((res:any)=>{ 
        res = res.data[0]; 
        if(!res) this.deleteStorages();
        else{
          this.dataUser = res;
          this.pushStorages();
        }
        },(error)=> { this.deleteStorages() }
      );
    }
}
