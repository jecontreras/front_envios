import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoRoutingModule } from './authentication-routing.module';
import { PublicacionviewsComponent } from './component/publicacionviews/publicacionviews.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PublicacionviewsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PublicoRoutingModule
  ]
})
export class PublicoModule { }
