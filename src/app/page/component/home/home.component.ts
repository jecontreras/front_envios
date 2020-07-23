import { Component, OnInit } from '@angular/core';
import { ApexChartService } from 'src/app/theme/shared/components/chart/apex-chart/apex-chart.service';
import { ChartDB } from 'src/app/fack-db/chart-data';
import { PublicacionService } from 'src/app/servicesComponents/publicacion.service';
import { ActividadService } from 'src/app/servicesComponents/actividad.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public chartDB: any;
  public query:any = { where:{ 
    estado: ['activo', 'consumido'],
    autocreo: false,
    type: ['img', 'url']
   }, 
   sort: "createdAt DESC",
   limit: 30,
   page: 0
  };
  config:any = {
    vista: "publicacion"
  };
  dataUser:any = {};
  
  constructor(
    public apexEvent: ApexChartService,
    public _publicacion: PublicacionService,
    private _Actividad: ActividadService,
    private _store: Store<STORAGES>
  ) { 
    this.chartDB = ChartDB;
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if (!store) return false;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() {
    if( Object.keys( this.dataUser ).length > 0) this._Actividad.generarActividad({ user: this.dataUser.id }).subscribe((res:any)=> console.log(res));
  }

}
