import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import { PortadaRoutingModule } from './portada-routing.module';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TerminosComponent } from './component/terminos/terminos.component';



@NgModule({
  declarations: [
    IndexComponent,
    TerminosComponent
  ],
  imports: [
    CommonModule,
    PortadaRoutingModule,
    CommonModule,
    FormsModule,
    NgImageSliderModule,
    InfiniteScrollModule
  ]
})
export class PortadaModule { }
