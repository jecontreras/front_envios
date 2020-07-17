import { Component, OnInit } from '@angular/core';
import { STORAGES } from 'src/app/interfaces/sotarage';
import { Store } from '@ngrx/store';
import { BancosService } from 'src/app/servicesComponents/bancos.service';
import { ToolsService } from 'src/app/services/tools.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-formbancos',
  templateUrl: './formbancos.component.html',
  styleUrls: ['./formbancos.component.scss']
})
export class FormbancosComponent implements OnInit {

  data: any = {};
  listBancos: any = [];
  dataUser: any = {};
  disableFile:boolean = true;
  id:any;

  constructor(
    private _store: Store<STORAGES>,
    private _bancos: BancosService,
    private _tools: ToolsService,
    private activate: ActivatedRoute,
    private Router: Router
  ) {
    this._store.subscribe((store: any) => {
      //console.log(store);
      store = store.name;
      if (!store) return false;
      this.dataUser = store.user || {};
    });
  }

  ngOnInit() {
    this.llenandoListaBancos();
    this.id = (this.activate.snapshot.paramMap.get('id'));
    if( this.id ) this.getBancos();
  }

  llenandoListaBancos() {
    //llenado de bancos
    this.listBancos = [
      {
        titulo: "Efecty",
        id: 'efecty',
        disabled: true
      },
      {
        titulo: "Afex",
        id: "afex",
        disabled: this.dataUser.pais === '!Colombia'
      },
      {
        titulo: "Moneygram",
        id: "moneygram",
        disabled: this.dataUser.pais === '!Colombia'
      },
      {
        titulo: "Western Union",
        disabled: this.dataUser.pais === '!Colombia',
        id: "western-union"
      },
      {
        titulo: "Ria / Riamoneytransfer",
        disabled: this.dataUser.pais === '!Colombia',
        id: "ria"
      },
      {
        titulo: "NEQUI",
        disabled: true,
        id: "nequi"
      },
      {
        titulo: "BBVA",
        disabled: true,
        id: "bbva"
      },
      {
        titulo: "Colpatria",
        disabled: true,
        id: "colpatria"
      },
      {
        titulo: "Davivienda",
        disabled: true,
        id: "davivienda"
      },
      {
        titulo: "Banco Caja Social",
        disabled: true,
        id: "banco-caja-social"
      },
      {
        titulo: "Banco Agrario",
        disabled: true,
        id: "banco-agrario"
      },
      {
        titulo: "Banco AV Villas",
        disabled: true,
        id: "banco-av-villas"
      },
      {
        titulo: "Banco Caja Social",
        disabled: true,
        id: "banco-caja-social"
      },
      {
        titulo: "Banco de Occidente",
        disabled: true,
        id: "banco-de-occidente"
      },
      {
        titulo: "Banco Popular",
        disabled: true,
        id: "banco-popular"
      },
      {
        titulo: "Bancóldex",
        disabled: true,
        id: "bancoldex"
      },
      {
        titulo: "Bancolombia",
        disabled: true,
        id: "bancolombia"
      },
      {
        titulo: "Banco de Bogotá",
        disabled: true,
        id: "banco-de-bogota"
      },
      {
        titulo: "GNB Sudameris",
        disabled: true,
        id: "gnb-sudameris"
      }
    ];
    this.listBancos = this.listBancos.filter((row: any) => row.disabled == true);
  }

  getBancos(){
    this._bancos.get( { where: { id: this.id, estado: "activo" },limit: 1 }).subscribe(( res:any )=>{
      res = res.data[0];
      if( !res ) return this.Router.navigate( ["dashboard/bancos"] );
      this.data = res;
    },error => this.Router.navigate( ["dashboard/bancos"] ));
  }

  submit() {
    this.disableFile = true;
    if( this.id ) this.editar();
    else this.guardar();
  }

  guardar() {
    this.data.user = this.dataUser.id;
    this._bancos.create(this.data).subscribe((res: any) => {
      this._tools.tooast({ title: "Banco Creada" });
      this.disableFile = false;
      this.Router.navigate( [ 'dashboard/bancos' ]);
    }, (error: any) => { this._tools.tooast({ title: "Error de servidor", icon: 'error' }); this.disableFile = false; })
  }

  editar() {
    let data:any = _.omitBy(this.data, _.isNull);
    data = _.omit(this.data, [ 'user', 'viewlive', 'where' ])
    this._bancos.update( data ).subscribe((res: any) => {
      this._tools.tooast({ title: "Banco Actualizada" });
      this.disableFile = false;
    }, (error: any) => { this._tools.tooast({ title: "Error de servidor", icon: 'error' }); this.disableFile = false; })
  }

}
