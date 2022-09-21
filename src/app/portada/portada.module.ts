import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import { PortadaRoutingModule } from './portada-routing.module';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TerminosComponent } from './component/terminos/terminos.component';
import { ConfigurarPagosComponent } from './component/configurar-pagos/configurar-pagos.component';
import { FormGuiaDetallesComponent } from './component/form-guia-detalles/form-guia-detalles.component';
import { ComponentModule } from '../component/component.module';
import { CotizarGuiaComponent } from './component/cotizar-guia/cotizar-guia.component';

@NgModule({
  declarations: [
    IndexComponent,
    TerminosComponent,
    ConfigurarPagosComponent,
    FormGuiaDetallesComponent,
    CotizarGuiaComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    PortadaRoutingModule,
    CommonModule,
    FormsModule,
    NgImageSliderModule,
    InfiniteScrollModule
  ]
})
export class PortadaModule { }
