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



@NgModule({
  declarations: [ PagesComponent, HomeComponent, TableroComponent, TareasComponent, ReferidosComponent, LiderComponent, MisPublicacionComponent, RetirosComponent, BancosComponent, PaqueteComponent, PerfilComponent, CategoriaComponent, ServicioClienteComponent ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ],
  bootstrap: [ PagesComponent ]
})
export class PagesModule { }
