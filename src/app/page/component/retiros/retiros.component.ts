import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicesComponents/usuarios.service';
import { ToolsService } from 'src/app/services/tools.service';
import * as _ from 'lodash';
import { RetirosService } from 'src/app/servicesComponents/retiros.service';
import { Router } from '@angular/router';
import { PuntosService } from 'src/app/servicesComponents/puntos.service';
import { PuntosResumenService } from 'src/app/servicesComponents/puntos-resumen.service';

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.scss']
})
export class RetirosComponent implements OnInit {
  
  tablet:any = {
    dataHeader: ["Opciones","Codigo","Titulo","Cantidad","Estado","Tipo Banco","Creado"],
    dataRow: [],
    count: 0
  };
  query:any = {
    where:{ },
    sort: "createdAt DESC",
    page: 0
  };
  data:any = {};
  progreses:boolean = false;
  public count: number = 0;
  
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;

  constructor(
    private _tools: ToolsService,
    private _retiros: RetirosService,
    private Router: Router,
    private _user: UsuariosService,
    private _puntos: PuntosService,
    private _puntosResumen: PuntosResumenService
  ) { }

  ngOnInit() {
    this.getRow();
    this.procesos();
  }

  procesos(){
    this._user.get( { where: { id: "5cedda91520be0ef68567182"}, limit: 1000 })
    .subscribe(async ( res:any )=> {
      console.log("count User", res.count );
      res = res.data;
      for( let row of res ){
        await this.ProcesoGetPuntos( row );
      }
    });
  }

  ProcesoGetPuntos( item:any ){
    return new Promise( resolve =>{
      this._puntos.get( { where:{ user: item.id, state: "valido" }, limit: 100000 })
      .subscribe( async( row:any )=>{
        console.log("count Puntos", row.count, "usuario", item.username );
        row = row.data;
        let query:any = {};
        for(let i = 0; i < row.length; i++){
          if( i == 0 ) {
            query = {
              id: row[i].id,
              valorAnterior: row[i].valor,
              valorTotal: row[i].valor,
              ordenando: i
            };
            row[i].valorAnterior = row[i].valor;
            row[i].valorTotal = row[i].valor;
            await this.ProceduresPuntoUltimo( query );
          }else{
            let valorTotal = row[ i-1 ]['valorTotal'];
            row[i]['valorAnterior'] = valorTotal;
            row[i]['valorTotal'] = 0;
            row[i]['valorTotal'] = row[i]['valorAnterior'] + row[i]['valor'];
            query = {
              id: row[i].id,
              valorAnterior: row[i].valorAnterior,
              valorTotal: row[i].valorTotal,
              ordenando: i
            };
            await this.ProceduresPuntoUltimo( query );
          }
        }
        console.log( row[ row.length -1 ] ) ;
        if( !row[ row.length -1 ] ) return resolve( false );
        if( !row[ row.length -1 ].id ) return resolve( false );
        row[ row.length -1 ].puntos = row[ row.length -1 ].id;
        await this.ProcesoCreandoResumen( row[ row.length -1 ] );
        return resolve( true );
      });
    });
  }

  ProceduresPuntoUltimo( data:any ){
    return new Promise( resolve =>{
      let datas:any = {
        id: data.id,  
        valorAnterior: data.valorAnterior,
        valor: data.valor,
        tipoEntrada: 0,
        valorTotal: data.valorTotal,
        ordenando: data.ordenando
      };
      this._puntos.update( datas ).subscribe(( row:any )=>{
        resolve( row );
      },( error:any )=> resolve( false ));
    })
  }

  ProcesoCreandoResumen( data:any ){
    return new Promise( resolve =>{
      delete data.id; delete data.crecreatedAt; delete data.updatedAt;
      this._puntosResumen.get( { where: { user: data.user, state: "valido" }, limit: 1 } ).subscribe(( row:any )=>{
        row = row.data[0];
        if( row ){
          data.id = row.id;
          this._puntosResumen.update( data ).subscribe(( row:any )=>{
            console.log( row ,"Actualizando");
            return resolve( row );
          });
        }else{
          this._puntosResumen.create( data ).subscribe(( row:any )=>{
            console.log( row , "Creando");
            return resolve( row );
          });
        }
      });
    });
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getRow();
     }
  }
   
  getRow(){
    this.progreses = true;
    this._retiros.get( this.query ).subscribe( async ( res:any ) =>{
      
      this.tablet.dataRow = _.unionBy( this.tablet.dataRow || [], res.data, 'id');
      this.tablet.count = res.count;
      this.progreses = false;
      // console.log( res );
    },( error:any )=> { this._tools.presentToast("Error de servidor"); this.progreses = false; });
  }

  verView( item:any ){
    if( item ) this.Router.navigate( [ "dashboard/formretiros", item.id ] );
    else this.Router.navigate( [ "dashboard/formretiros" ] );
  }


}
