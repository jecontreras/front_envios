import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { TareaMegaComponent } from './component/tarea-mega/tarea-mega.component';
import { TareaMiniComponent } from './component/tarea-mini/tarea-mini.component';
import { ViewPerfilComponent } from './component/view-perfil/view-perfil.component';
import { BannerComponent } from './component/banner/banner.component';
import { FormpublicacionComponent } from './form/formpublicacion/formpublicacion.component';
import { FormbannerComponent } from './form/formbanner/formbanner.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "tablero",
    component: TableroComponent
  },
  {
    path: "tareasdiarias",
    component: TareasComponent
  },
  {
    path: "tareasmini",
    component: TareaMiniComponent
  },
  {
    path: "tareasmega",
    component: TareaMegaComponent
  },
  {
    path: "referidos",
    component: ReferidosComponent
  },
  {
    path: "lider",
    component: LiderComponent
  },
  {
    path: "mispublicacion",
    component: MisPublicacionComponent
  },
  {
    path: "retiros",
    component: RetirosComponent
  },
  {
    path: "bancos",
    component: BancosComponent
  },
  {
    path: "paquetes",
    component: PaqueteComponent
  },
  {
    path: "perfil",
    component: PerfilComponent
  },
  {
    path: "categorias",
    component: CategoriaComponent
  },
  {
    path: "servicioCliente",
    component: ServicioClienteComponent
  },
  {
    path: "view_perfil/:id",
    component: ViewPerfilComponent
  },
  {
    path: "formpublicacion",
    component: FormpublicacionComponent
  },
  {
    path: "formpublicacion/:id",
    component: FormpublicacionComponent
  },
  {
    path: "formbanner",
    component: FormbannerComponent
  },
  {
    path: "formbanner/:id",
    component: FormbannerComponent
  },
  {
    path: "banner",
    component: BannerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
