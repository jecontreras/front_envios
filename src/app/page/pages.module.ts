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
import { SolicitudRecogidaComponent } from './form/solicitud-recogida/solicitud-recogida.component';
import { ListRecogiaComponent } from './component/list-recogia/list-recogia.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { RelacionDespachoComponent } from './component/relacion-despacho/relacion-despacho.component';
import { TokenPlatformComponent } from './component/token-platform/token-platform.component';
import { FormEstadoGuiaComponent } from './form/form-estado-guia/form-estado-guia.component';
import { ComponentModule } from '../component/component.module';
import { MonederoComponent } from './component/monedero/monedero.component';
import { FormRetirosComponent } from './form/form-retiros/form-retiros.component';
import { ListRetirosComponent } from './component/list-retiros/list-retiros.component';

@NgModule({
  declarations: [ 
    HomeComponent,
    PagesComponent,
    FleteComponent,
    FormFleteComponent,
    ElaboracionGuiasComponent,
    EstadoGuiasComponent,
    SolicitudRecogidaComponent,
    ListRecogiaComponent,
    PerfilComponent,
    RelacionDespachoComponent,
    TokenPlatformComponent,
    FormEstadoGuiaComponent,
    MonederoComponent,
    FormRetirosComponent,
    ListRetirosComponent
  ],
  imports: [
    ComponentModule,
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
