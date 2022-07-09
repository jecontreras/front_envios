import { Component, OnInit } from '@angular/core';
import { UserEnviosService } from 'src/app/servicesComponents/user-envios.service';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  data:any = {};
  disabled:boolean = false;
  leer:any = { activa1: 200 };
  letra:any ={ text: `esto llevara tu negocio a otro nivel ya que el sistema de pago contra entrega aumenta las posiblidades de un mayor numero de ventas ya que esto da seguridad de compra a tus clientes
  NOTA:recaudamos tu dinero y te desembolsamos cada 10 dias haviles (solo cuentan dias de lunes a viernes) (No domingos ni festivos ) 
  Recuerda:en cada desembolso se habra echo efectivo el descuento de fletes de envios, o devoluciones y el valor de costo de cada producto del que allas recibido credito por parte de nuestra fabrica de calzado
  Metodos disponibles para recibir tu desembolso: 
  cuenta de ahorros Bancolombia-ahorro a la mano de bancolombia-nequi
  cuenta de ahorros davivienda-daviplata`};

  foto1: string = "./assets/extra/fondo.webp";
  listaFotos:any = [
    "./assets/portada/imagenes/foto1.jpg",
    "./assets/portada/imagenes/banner1.jpg",
    "./assets/portada/imagenes/banner2.jpg",
    "./assets/portada/imagenes/banner3.jpg",
  ];
  constructor(
    private _userEnvios: UserEnviosService,
    private _tools: ToolsService
  ) { }

  ngOnInit(): void {
    let index:number = 0;
    // setInterval(()=>{
    //   this.foto1 = this.listaFotos[index];
    //   index++;
    //   if( index >= 3 ) index = 0;
    // },5000);
  }

  registrando(){
    this.disabled = true;
    this._userEnvios.create( this.data ).subscribe( ( res:any )=>{
      console.log( res );
      this._tools.tooast( { title: "Gracias Por registrarse" } );
      this.data = {};
      this.disabled = false;
    },(error)=> this.disabled = false );
  }

  copia(){
    /*<header class="header-section">
    <div class="menu-item">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-2 col-xs-2">
                    <div class="logo">
                        <a href="./index.html">
                            <img src="./assets/imagenes/logo.jpeg" class="alto" alt="">
                        </a>
                    </div>
                </div>
                <div class="col-12 col-sm-10 col-xs-10">
                    <div class="nav-menu">
                        <nav class="mainmenu">
                            <ul>
                                <!-- <li><a target="_blank" href="{{ urlPagos }}">SOLICITUD DE CREDITO Y CONFIGURACION DE TUS PAGOS</a></li> -->
                                <li><a [routerLink]="['/auth/login']">REGISTRATE - INICIA SECCIÓN</a></li>
                                <li class="active"><a target="_blank"
                                        href="https://fabricaybodega-59c8e.firebaseapp.com/registro/1">CATALOGO PARA EL
                                        SISTEMA</a></li>
                                <li><a [routerLink]="['/portada/guiadetalles']">RASTREO DE ENVÍO</a></li>
                                <!-- <li><a target="_blank" href="https://fabricaybodega-59c8e.firebaseapp.com/">INGRESA
                                        A TU OFICINA</a></li> -->
                                <!-- <li><a target="_blank" href="https://fabricaybodega-59c8e.firebaseapp.com/">CALZADO
                                        A CREDITO</a></li> -->
                                <!-- <li><a target="_blank" href="https://enviosrrapidoscom.web.app/">PLATAFORMA DE
                                        ENVIOS</a></li> -->
                                <!-- <li><a target="_blank"
                                        href="https://bit.ly/GENERARGUIASDEENVIA">GENERAR
                                        GUÍAS</a></li> -->
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<!-- Footer Section Begin -->
<footer class="footer-section">
    <div class="container">
        <div class="footer-text">
            <div class="row">
                <div class="col-lg-4">
                    <div class="ft-about">
                        <div class="logo">
                            <a href="#">
                                <img src="./assets/imagenes/logo.jpeg" class="logoFooter" alt="">
                            </a>
                        </div>
                        <p>Empresa colombiana ayudando a los empresarios de corazon</p>
                        <div class="fa-social">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                            <a href="#"><i class="fa fa-tripadvisor"></i></a>
                            <a href="#"><i class="fa fa-instagram"></i></a>
                            <a href="#"><i class="fa fa-youtube-play"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 offset-lg-1">
                    <div class="ft-contact">
                        <h6>Menu</h6>
                        <ul>
                            <li><a [routerLink]="['/auth/login']">REGISTRATE - INICIA SECCIÓN</a></li>
                            <li class="active"><a target="_blank"
                                    href="https://fabricaybodega-59c8e.firebaseapp.com/registro/1">CATALOGO PARA EL
                                    SISTEMA</a></li>
                            <li><a [routerLink]="['/portada/guiadetalles']">RASTREO DE ENVÍO</a></li>
                            <li><a target="_blank" href="{{ urlTerminos }}">TERMINOS Y CONDICIONES</a></li>
                        </ul>
                    </div>
                    <div class="ft-contact">
                        <h6>Contacto</h6>
                        <ul>
                            <li>(57) 315 4074456</li>
                            <li>enviosrrapidos@gmail.com</li>
                            <li>barrio claret</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>


<section class="hero-section">
    <img [src]="foto1" class="img" alt="">
    <div class="row fondo">
        <div class="col-lg-6 ">
            <div class="hero-text">
                <h1 class="textInf colorTitle">Enviosrrapidos.com</h1>
                <p class="colorTitle">Somos el mejor aliado para los envíos de tu tienda virtual te ofrecemos recaudo de tu dinero pago
                    contra entrega a nivel nacional.</p>
                <a href="#" class="primary-btn">Ver Mas</a>
            </div>
        </div>
        <!-- <div class="col-xl-4 col-lg-5 offset-xl-2 offset-lg-1.2">
            <div class="booking-form">
                <div class="row">
                    <div class="col-12">
                        <h3>Registrarse</h3>
                    </div>
                    <div class="form-group col-6">
                        <label for="exampleFormControlInput1">Nombre completo</label>
                        <input type="text" class="form-control" [(ngModel)]="data.nombre">
                    </div>
                    <div class="form-group col-6">
                        <label for="exampleFormControlInput1">Apellido completo</label>
                        <input type="text" class="form-control" [(ngModel)]="data.apellido">
                    </div>
                    <div class="form-group col-6">
                        <label for="exampleFormControlInput1">Numero de Identificacion</label>
                        <input type="number" class="form-control" [(ngModel)]="data.Nidentificacion">
                    </div>
                    <div class="form-group col-6">
                        <label for="exampleFormControlInput1">Numero de Whatsaap</label>
                        <input type="number" class="form-control" [(ngModel)]="data.Nwhatsaap">
                    </div>
                    <div class="form-group col-6">
                        <label for="exampleFormControlInput1">Direccion de recogida</label>
                        <input type="text" class="form-control" [(ngModel)]="data.direccionRecogida">
                    </div>
                    <div class="form-group col-6">
                        <label for="exampleFormControlInput1">Correo electronico</label>
                        <input type="email" class="form-control" [(ngModel)]="data.correo">
                    </div>
                    <div class="form-group col-12">
                        <label for="exampleFormControlInput1">Url de tu perfil de facebook</label>
                        <input type="text" class="form-control" [(ngModel)]="data.urlFacebook">
                    </div>
                    <div class="col-12">
                        <div class="d-flex justify-content-center">
                            <button type="submit" [disabled]="disabled" (click)="registrando()">Registrarse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</section>
<!-- Hero Section End -->

<!-- Services Section End -->
<section class="services-section spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <!-- <br><br><br><br> -->
                <div class="section-title">
                    <span>Nuestro Servicios</span>
                    <h2>Descubra nuestros servicios</h2>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 col-sm-6">
                <div class="service-item">
                    <i class="flaticon-036-parking"></i>
                    <h4>Servicio de Pago Contra Entrega</h4>
                    <p>{{ letra.text | slice: 0: leer.activa1 }}</p>
                    <span *ngIf="leer.activa1 == 200" (click)="leer.activa1 = 1000;">Leer Mas</span>
                    <span *ngIf="leer.activa1 != 200" (click)="leer.activa1 = 200;">Leer Menos</span>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="service-item">
                    <i class="flaticon-033-dinner"></i>
                    <h4>Rastreo Inteligente</h4>
                    <p>Nuestro sistema de información permite rastrear los envíos las 24 horas, de manera detallada
                        y durante cada proceso operativo.</p>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="service-item">
                    <i class="flaticon-026-bed"></i>
                    <h4>Integración Vía Web Services</h4>
                    <p>Solución digital que conecta en línea los sistemas de información tanto del Cliente como de
                        enviosrrrapidos.com, para realizar cotizaciones, solicitudes y seguimiento, principalmente.
                    </p>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="service-item">
                    <i class="flaticon-024-towel"></i>
                    <h4>Control Satelital</h4>
                    <p>Para garantizar la seguridad de los envíos, realizamos control, monitoreo satelital y
                        vigilancia de rutas por georeferenciación a la flota vehicular. de nuestros aliados</p>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="service-item">
                    <i class="flaticon-044-clock-1"></i>
                    <h4>Enviosrrapidos.com</h4>
                    <p>Plataforma web desarrollada para el Cliente Corporativo que permite administrar la
                        información de sus envíos en tiempo real, realizar solicitudes y gestionar novedades de
                        manera fácil, rápida y segura.</p>
                </div>
            </div>
            <div class="col-lg-4 col-sm-6">
                <div class="service-item">
                    <i class="flaticon-012-cocktail"></i>
                    <h4>Enviosrrapidos.com</h4>
                    <p>Portal web corporativo al cual se podrá acceder desde cualquier dispositivo fijo o móvil para
                        cotizar, solicitar y rastrear los envíos. Además, contiene la más completa información sobre
                        nuestra Compañía, Portafolio de Servicios, Noticias, Boletín de Carreteras, acceso a Redes
                        Sociales y canales de contacto, entre otros.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Blog Section Begin -->
<section class="blog-section spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="section-title">
                    <span>Ciudades</span>
                    <h2>Envios a toda Colombia</h2>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4">
                <div class="blog-item set-bg img1" data-setbg="./assets/portada/img/blog/blog-1.jpg">
                    <div class="bi-text">
                        <span class="b-tag">Cali</span>
                        <h4><a href="#">Envios a cali</a></h4>
                        <div class="b-time"><i class="icon_clock_alt"></i> 15th April, 2019</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="blog-item set-bg img2" data-setbg="./assets/portada/img/blog/blog-2.jpg">
                    <div class="bi-text">
                        <span class="b-tag">Bogota</span>
                        <h4><a href="#">Envios a Bogota</a></h4>
                        <div class="b-time"><i class="icon_clock_alt"></i> 15th April, 2019</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="blog-item set-bg img3" data-setbg="./assets/portada/img/blog/blog-3.jpg">
                    <div class="bi-text">
                        <span class="b-tag">Barranquilla</span>
                        <h4><a href="#">Envios a Barranquilla</a></h4>
                        <div class="b-time"><i class="icon_clock_alt"></i> 21th April, 2019</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="blog-item small-size set-bg img4" data-setbg="./assets/portada/img/blog/blog-wide.jpg">
                    <div class="bi-text">
                        <span class="b-tag">Medellin</span>
                        <h4><a href="#">Envios a medellin</a></h4>
                        <div class="b-time"><i class="icon_clock_alt"></i> 08th April, 2019</div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="blog-item small-size set-bg img5" data-setbg="./assets/portada/img/blog/blog-10.jpg">
                    <div class="bi-text">
                        <span class="b-tag">Cúcuta</span>
                        <h4><a href="#">Envios a Cúcuta</a></h4>
                        <div class="b-time"><i class="icon_clock_alt"></i> 12th April, 2019</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>*/
  }
}  
