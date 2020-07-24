import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './component/home/home.component';
import { TableroComponent } from './component/tablero/tablero.component';
import { TareasComponent } from './component/tareas/tareas.component';
import { ReferidosComponent } from './component/referidos/referidos.component';
import { LiderComponent } from './component/lider/lider.component';
import { MisPublicacionComponent } from './component/mis-publicacion/mis-publicacion.component';
import { RetirosComponent } from './component/retiros/retiros.component';
import { BancosComponent } from './component/bancos/bancos.component';
import { PaqueteComponent } from './component/paquete/paquete.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ServicioClienteComponent } from './component/servicio-cliente/servicio-cliente.component';
import { SharedModule } from '../theme/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TareaMiniComponent } from './component/tarea-mini/tarea-mini.component';
import { TareaMegaComponent } from './component/tarea-mega/tarea-mega.component';
import { ToolsPublicacionComponent } from './tools/tools-publicacion/tools-publicacion.component';
import { ViewPerfilComponent } from './component/view-perfil/view-perfil.component';
import { BannerComponent } from './component/banner/banner.component';
import { ToolAdminPublicComponent } from './tools/tool-admin-public/tool-admin-public.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormpublicacionComponent } from './form/formpublicacion/formpublicacion.component';
import { FormbannerComponent } from './form/formbanner/formbanner.component';
import { FormretirosComponent } from './form/formretiros/formretiros.component';
import { FormbancosComponent } from './form/formbancos/formbancos.component';
import { NgxCurrencyModule } from "ngx-currency";
import { AdminMarketplaceComponent } from './component/admin-marketplace/admin-marketplace.component';


@NgModule({
  declarations: [ 
    PagesComponent, 
    HomeComponent, 
    TableroComponent, 
    TareasComponent, 
    ReferidosComponent, 
    LiderComponent, 
    MisPublicacionComponent, 
    RetirosComponent, 
    BancosComponent, 
    PaqueteComponent, 
    PerfilComponent, 
    CategoriaComponent, 
    ServicioClienteComponent, 
    TareaMiniComponent, 
    TareaMegaComponent, 
    ToolsPublicacionComponent, 
    ViewPerfilComponent, 
    BannerComponent, 
    ToolAdminPublicComponent, 
    FormpublicacionComponent, FormbannerComponent, FormretirosComponent, FormbancosComponent, AdminMarketplaceComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    AngularEditorModule,
    NgxCurrencyModule
  ],
  bootstrap: [ PagesComponent ]
})
export class PagesModule { }
