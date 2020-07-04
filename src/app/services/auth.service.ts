import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import {Router, CanActivate } from '@angular/router';
import { UsuariosService } from '../servicesComponents/usuarios.service';
export interface User {
  heroesUrl: string;
  textfile: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private http: HttpClient,
    private router: Router,
    private _usuario: UsuariosService
    // private route: ActivatedRoute
  ) {}

   private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
      if (!localStorage.getItem('user')) {
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
      let identity:any = localStorage.getItem('user');
      // console.log(this.route._routerState.snapshot.url);
      // return false;
      if (identity) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
      
    }
}
