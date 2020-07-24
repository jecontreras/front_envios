import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoRoutingModule } from './publico-routing.module';
import { PublicacionviewsComponent } from './component/publicacionviews/publicacionviews.component';
import { FormsModule } from '@angular/forms';
import { MarkeplaceComponent } from './component/markeplace/markeplace.component';



@NgModule({
  declarations: [
    PublicacionviewsComponent,
    MarkeplaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PublicoRoutingModule
  ]
})
export class PublicoModule { }
