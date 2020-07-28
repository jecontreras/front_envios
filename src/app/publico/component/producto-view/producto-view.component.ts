import { Component, OnInit, ViewChild } from '@angular/core';
import { CART } from 'src/app/interfaces/sotarage';
import { ToolsService } from 'src/app/services/tools.service';
import { Store } from '@ngrx/store';
import { SeleccionCategoriaAction, CartAction, ProductoHistorialAction } from 'src/app/redux/app.actions';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { NgImageSliderComponent } from 'ng-image-slider';
import { MerkaplaceService } from 'src/app/servicesComponents/merkaplace.service';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.scss']
})
export class ProductosViewComponent implements OnInit {

  id:any;
  data:any = {};
  pedido:any = { cantidad:1 };
  view:string = "descripcion";
  rango:number = 250;
  listProductos:any = [];
  query:any = {
    where:{
      pro_activo: 0
    },
    page: 0,
    limit: 10
  };
  loader:boolean = false;
  notEmptyPost:boolean = true;
  notscrolly:boolean=true;
  listProductosHistorial:any = [];
  tiendaInfo:any = {};

  imageObject:any = [
    {
      image: "./assets/imagenes/1920x700.png",
      thumbImage: "./assets/imagenes/1920x700.png",
      alt: '',
      check: true,
      id: 1,
      title: ""
    }
  ];
  listGaleria:any = [
    {
      image: "./assets/imagenes/1920x700.png",
      thumbImage: "./assets/imagenes/1920x700.png",
      alt: '',
      check: true,
      id: 1,
      title: ""
    }
  ];

  @ViewChild('nav', {static: true}) ds: NgImageSliderComponent;
  sliderWidth: Number = 1119;
  sliderImageWidth: Number = 250;
  sliderImageHeight: Number = 200;
  sliderArrowShow: Boolean = true;
  sliderInfinite: Boolean = true;
  sliderImagePopup: Boolean = false;
  sliderAutoSlide: Number = 0;
  sliderSlideImage: Number = 1;
  sliderAnimationSpeed: any = 1;
  
  userId:any = {};
  dataUser:any = {};
  urlwhat:string

  constructor(
    private _store: Store<CART>,
    private _tools: ToolsService,
    private activate: ActivatedRoute,
    private _merkaplace: MerkaplaceService,
    private Router: Router,
  ) { 
    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      if(!store) return false;
      this.userId = store.usercabeza || {};
      this.dataUser = store.user || {};
      this.listProductosHistorial = _.orderBy(store.productoHistorial, ['createdAt'], ['DESC']);
      this.tiendaInfo = store.configuracion || {};
    });
  }

  ngOnInit(): void {
    if((this.activate.snapshot.paramMap.get('id'))){
      this.id = this.activate.snapshot.paramMap.get('id');
      this.getProducto();
      this.getProductos();
    }
  }

  getProducto(){
    this._merkaplace.get({ where: { id: this.id}}).subscribe((res:any)=>{ this.data = res.data[0] || {}; }, error=> { console.error(error); this._tools.presentToast('Error de servidor'); });
  }

  getProductos(){
    //this.spinner.show();
    this._merkaplace.get( this.query ).subscribe((res:any)=>{ 
      if( res.data[0] ) this.imageObject = [];
      for( let row of res.data ){
        this.imageObject.push(
          {
            image: row.foto,
            thumbImage: row.foto,
            alt: '',
            check: true,
            id: row.id,
            ids: row.id,
            title: this._tools.monedaChange( 3, 2, row.pro_uni_venta || 0 )
          }
        );
        this.listProductos.push( row );
      }
      //this.spinner.hide();
      this.loader = false;
      if (res.data.length === 0 ) {
        this.notEmptyPost =  false;
      }
      this.notscrolly = true;
    }, ( error )=> { console.error(error); /*this.spinner.hide();*/ this.loader = false;});
  }

  suma(){
    this.data.costo = Number( this.pedido.cantidad ) * this.data.pro_uni_venta;
  }

  codigo(){
    return (Date.now().toString(20).substr(2, 3) + Math.random().toString(20).substr(2, 3)).toUpperCase();
  }

  categoriasVer(){
    let accion = new SeleccionCategoriaAction( this.data.pro_categoria, 'post');
    this._store.dispatch(accion);
    this.Router.navigate(['/tienda/productos']);
  }

  AgregarCart(){
    this.suma();
    let data = {
      articulo: this.data.id,
      codigo: this.data.pro_codigo,
      titulo: this.data.pro_nombre,
      color: "",
      talla: this.pedido.talla,
      foto: this.data.foto,
      cantidad: this.pedido.cantidad || 1,
      costo: this.data.pro_uni_venta,
      costoTotal: this.data.costo,
      id: this.codigo()
    };
    let accion = new CartAction(data, 'post');
    this._store.dispatch(accion);
    this._tools.presentToast("Producto agregado al carro");
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

  AgregarCart2( item:any ){
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

  imageOnClick(obj:any) {
    let data =  this.listProductos.find( (row:any )=> row.id == this.imageObject[obj].id);
    if( !data ) return false;
    this.viewProducto( data );
  }

  arrowOnClick(event) {
      // console.log('arrow click event', event);
  }

  lightboxArrowClick(event) {
      // console.log('popup arrow click', event);
  }

  prevImageClick() {
      this.ds.prev();
  }

  nextImageClick() {
      this.ds.next();
  }

  masInfo(obj:any){
    obj.talla = this.pedido.talla;
    obj.cantidad = this.pedido.cantidad || 1;
    let cerialNumero:any = ''; 
    let numeroSplit:any;
    let cabeza:any = this.dataUser.cabeza;
    if( cabeza ){
      numeroSplit = _.split( cabeza.usu_telefono, "+57", 2);
      if( numeroSplit[1] ) cabeza.usu_telefono = numeroSplit[1];
      if( cabeza.usu_perfil == 3 ) cerialNumero = ( cabeza.usu_indicativo || '57' ) + ( cabeza.usu_telefono || '3208429429' );
      else cerialNumero = "57"+this.validarNumero();
    }else cerialNumero = "57"+this.validarNumero();
    if(this.userId.id) this.urlwhat = `https://wa.me/${ this.userId.usu_indicativo || 57 }${ ( (_.split( this.userId.usu_telefono , "+57", 2))[1] ) || '3208429429'}?text=Hola Servicio al cliente, como esta, saludo cordial, estoy interesad@ en mas informacion ${obj.pro_nombre} codigo ${obj.pro_codigo} foto ==> ${ obj.foto } Talla: ${ obj.talla || 'default' }`;
    else {
      this.urlwhat = `https://wa.me/${ cerialNumero }?text=Hola Servicio al cliente, como esta, saludo cordial, estoy interesad@ en mas informacion ${obj.pro_nombre} codigo ${obj.pro_codigo} foto ==> ${ obj.foto } Talla: ${ obj.talla || 'default'}`;
    }
    window.open(this.urlwhat);
  }

  validarNumero(){
    return this.tiendaInfo.numeroCelular || "3208429429";
  }


}
