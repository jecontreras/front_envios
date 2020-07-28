import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoRoutingModule } from './publico-routing.module';
import { PublicacionviewsComponent } from './component/publicacionviews/publicacionviews.component';
import { FormsModule } from '@angular/forms';
import { MarkeplaceComponent } from './component/markeplace/markeplace.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ProductosViewComponent } from './component/producto-view/producto-view.component';
import { ProductosComponent } from './component/productos/productos.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    PublicacionviewsComponent,
    MarkeplaceComponent,
    ProductosViewComponent,
    ProductosComponent
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
