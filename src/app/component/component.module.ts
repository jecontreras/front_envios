import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoGuiasComponent } from './estado-guias/estado-guias.component';
import { FormsModule } from '@angular/forms';
import { ElaborationGuideComponent } from './elaboration-guide/elaboration-guide.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxCurrencyModule } from 'ngx-currency';



@NgModule({
  declarations: [
    EstadoGuiasComponent,
    ElaborationGuideComponent
  ],
  exports: [
    EstadoGuiasComponent,
    ElaborationGuideComponent
  ],
  imports: [
    FormsModule,
    AutocompleteLibModule,
    NgxCurrencyModule,
    CommonModule
  ]
})
export class ComponentModule { }
