import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoRoutingModule } from './publico-routing.module';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    PublicoRoutingModule,
    NgImageSliderModule,
    InfiniteScrollModule
  ]
})
export class PublicoModule { }
