import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import { PortadaRoutingModule } from './portada-routing.module';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    IndexComponent
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
