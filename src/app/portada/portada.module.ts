import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './component/index/index.component';
import { PortadaRoutingModule } from './portada-routing.module';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    PortadaRoutingModule
  ]
})
export class PortadaModule { }
