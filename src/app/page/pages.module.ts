import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../theme/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HomeComponent } from './component/home/home.component';
import { FleteComponent } from './component/flete/flete.component';
import { FormFleteComponent } from './form/form-flete/form-flete.component';
import { ElaboracionGuiasComponent } from './component/elaboracion-guias/elaboracion-guias.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { EstadoGuiasComponent } from './component/estado-guias/estado-guias.component';
import { FormGuiaDetallesComponent } from './form/form-guia-detalles/form-guia-detalles.component';
import { SolicitudRecogidaComponent } from './form/solicitud-recogida/solicitud-recogida.component';
import { ListRecogiaComponent } from './component/list-recogia/list-recogia.component';
import { PerfilComponent } from './component/perfil/perfil.component';

@NgModule({
  declarations: [ 
    HomeComponent,
    PagesComponent,
    FleteComponent,
    FormFleteComponent,
    ElaboracionGuiasComponent,
    EstadoGuiasComponent,
    FormGuiaDetallesComponent,
    SolicitudRecogidaComponent,
    ListRecogiaComponent,
    PerfilComponent
  ],
  entryComponents:[
    FormGuiaDetallesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    AngularEditorModule,
    NgxCurrencyModule,
    NgxDropzoneModule,
    AutocompleteLibModule
  ],
  bootstrap: [ PagesComponent ]
})
export class PagesModule { }
