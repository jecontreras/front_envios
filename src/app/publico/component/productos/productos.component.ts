import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CART } from 'src/app/interfaces/sotarage';
import { ProductoHistorialAction, CartAction, BuscadorAction } from 'src/app/redux/app.actions';
import * as _ from 'lodash';
import { ToolsService } from 'src/app/services/tools.service';
import { MerkaplaceService } from 'src/app/servicesComponents/merkaplace.service';
import { CATEGORIAS } from 'src/app/JSON/categoria';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  listProductos:any = [];
  query:any = {
    where:{
      //estado: "activo"
    },
    page: 0,
    limit: 15
  };
  dataSeleccionda:string;
  listProductosHistorial: any = [];
  listProductosRecomendar: any = [];

  seartxt:string = '';
  loader:boolean = false;
  notscrolly:boolean=true;
  notEmptyPost:boolean = true;
  busqueda:any = {};

  tiendaInfo:any = {};
  listCategorias:any = CATEGORIAS;
  monedaChange:any;

  constructor(
    private _merkaplace: MerkaplaceService,
    private _store: Store<CART>,
    private _tools: ToolsService,
  ) { 
    this._store.subscribe((store: any) => {
      store = store.name;
      if(!store) return false;
      this.listProductosHistorial = _.orderBy(store.productoHistorial, ['createdAt'], ['DESC']);
      this.tiendaInfo = store.configuracion || {};
      if( store.buscador ) if( Object.keys(store.buscador).length > 0 ) {  if( store.buscador.search ) { this.seartxt = store.buscador.search; this.buscar(); this.borrarBusqueda(); this.dataSeleccionda = store.buscador.search } }
    });
  }

  ngOnInit() {
    this.monedaChange = this._tools.monedaChange;
    this.getProductos();
    this.getProductosRecomendado();
  }

  SeleccionCategoria( obj:any ){
    this.query = { where:{ estado: "activo" }, page: 0, limit: 10 };
    if( obj.id ) this.query.where.categoria = obj.titulo;
    this.listProductos = [];
    this.getProductos();
    this.dataSeleccionda = obj.titulo;
  }

  searchColor( color:string ){
    this.query.where.color= color; 
  }

  onScroll(){
    if (this.notscrolly && this.notEmptyPost) {
       this.notscrolly = false;
       this.query.page++;
       this.getProductos();
     }
   }

  getProductos(){
    //this.spinner.show();
    this._merkaplace.get(this.query).subscribe((res:any)=>{ 
      this.listProductos = _.unionBy(this.listProductos || [], res.data, 'id');
      //this.spinner.hide();
      this.loader = false;
      if (res.data.length === 0 ) {
        this.notEmptyPost =  false;
      }
      this.notscrolly = true;
    }, ( error )=> { console.error(error); /*this.spinner.hide();*/ this.loader = false;});
  }

  getProductosRecomendado(){
    this._merkaplace.get( { where:{ estado: "activo" }, sort: "createdAt DESC", page: 0, limit: 5 }).subscribe((res:any)=>{ console.log(res); this.listProductosRecomendar = res.data; }, ( error )=> { console.error(error); });
  }
  
  viewProducto( obj:any ){
    // const dialogRef = this.dialog.open(InfoProductoComponent,{
    //   width: '855px',
    //   maxHeight: "665px",
    //   data: { datos: obj }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    // let filtro = this.listProductosHistorial.filter( ( row:any ) => row.id == obj.id );
    // if(filtro) return false;
    // let accion = new ProductoHistorialAction( obj , 'post');
    // this._store.dispatch( accion );
  }

  AgregarCart(item:any){
    let data:any = {
      articulo: item.id,
      codigo: item.pro_codigo,
      titulo: item.pro_nombre,
      foto: item.foto,
      talla: item.talla,
      cantidad: item.cantidadAdquirir || 1,
      costo: item.pro_uni_venta,
      costoTotal: ( item.pro_uni_venta*( item.cantidadAdquirir || 1 ) ),
      id: this.codigo()
    };
    let accion = new CartAction(data, 'post');
    this._store.dispatch(accion);
    this._tools.presentToast("Agregado al Carro");
  }

  codigo(){
    return (Date.now().toString(20).substr(2, 3) + Math.random().toString(20).substr(2, 3)).toUpperCase();
  }

  buscar() {
    //console.log(this.seartxt);
    this.loader = true;
    this.seartxt = this.seartxt.trim();
    this.listProductos = [];
    this.notscrolly = true; 
    this.notEmptyPost = true;
    this.query = { where:{ estado: "activo" } ,limit: 15, page: 0 };
    if (this.seartxt) {
      this.query.where.or = [
        {
          marca: {
            contains: this.seartxt|| ''
          }
        },
        {
          categoria: {
            contains: this.seartxt|| ''
          }
        },
        {
          slug: {
            contains: _.kebabCase( this.seartxt || '' )
          }
        },
        {
          descripcion: {
            contains: this.seartxt|| ''
          }
        }
      ];
    }
    this.getProductos();
  }
  buscarFiltro( opt:string ){
    this.query = { where:{ estado: "activo" } ,limit: 15, page: 0 };
    if(opt == 'ordenar'){
      if(this.busqueda.ordenar == 1){
        this.dataSeleccionda = "";
        delete this.query.sort
      }
      if(this.busqueda.ordenar == 2){
        this.dataSeleccionda = "Ordenar nombre";
        this.query.sort = 'titulo DESC';
      }
      if(this.busqueda.ordenar == 3){
        this.dataSeleccionda = "Ordenar Precio";
        this.query.sort = 'precio DESC';
      }
      if(this.busqueda.ordenar == 3){
        this.dataSeleccionda = "Ordenar Fecha";
        this.query.sort = 'createdAt DESC';
      }
    }
    this.listProductos = [];
    this.loader = true;
    this.getProductos();
  }

  borrarBusqueda(){
    let accion = new BuscadorAction({}, 'drop');
    this._store.dispatch( accion );
  }

}
