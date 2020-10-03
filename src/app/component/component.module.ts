import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoGuiasComponent } from './estado-guias/estado-guias.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EstadoGuiasComponent
  ],
  exports: [
    EstadoGuiasComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class ComponentModule { }
