import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ActividadService } from './servicesComponents/actividad.service';
import { Store } from '@ngrx/store';
import { STORAGES } from './interfaces/sotarage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  dataUser:any = {};
  
  constructor(
    private router: Router,
    private _Actividad: ActividadService,
    private _store: Store<STORAGES>
  ) {
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if (!store) return false;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() {
    console.log( Object.keys( this.dataUser ).length );
    if( Object.keys( this.dataUser ).length > 0) this._Actividad.generarActividad({ user: this.dataUser.id }).subscribe((res:any)=> console.log(res));
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
