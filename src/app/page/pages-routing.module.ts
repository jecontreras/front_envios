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
    path: "tareas",
    component: TareasComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
