import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { PuntosResumenService } from 'src/app/servicesComponents/puntos-resumen.service';
import { PuntosService } from 'src/app/servicesComponents/puntos.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-form-retiros',
  templateUrl: './form-retiros.component.html',
  styleUrls: ['./form-retiros.component.scss']
})
export class FormRetirosComponent implements OnInit {
  data:any = {};
  dataUser:any = {};
  superSub:boolean = true;
  opcionCurrencys:any;
  constructor(
    private _store: Store<STORAGES>,
    public _tools: ToolsService,
    private _puntosResumen: PuntosResumenService,
    private _puntos: PuntosService,
  ) {
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.dataUser = store.user || {};

    });
  }

  ngOnInit() {
    this.opcionCurrencys = this._tools.currency;
    this.getPuntosResumen();
  }

  getPuntosResumen(){
    this._puntosResumen.get( { where: { user: this.dataUser.id } } ).subscribe(( res:any )=>{
      res = res.data[0];
      console.log( res );
      if( !res ) return false;
      this.data.monto = res.valorTotal;
    });
  }

}
