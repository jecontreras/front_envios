import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FleteComponent } from './component/flete/flete.component';
import { FormFleteComponent } from './form/form-flete/form-flete.component';
import { ElaboracionGuiasComponent } from './component/elaboracion-guias/elaboracion-guias.component';
import { EstadoGuiasComponent } from './component/estado-guias/estado-guias.component';
import { SolicitudRecogidaComponent } from './form/solicitud-recogida/solicitud-recogida.component';
import { ListRecogiaComponent } from './component/list-recogia/list-recogia.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { RelacionDespachoComponent } from './component/relacion-despacho/relacion-despacho.component';
import { TokenPlatformComponent } from './component/token-platform/token-platform.component';
import { FormEstadoGuiaComponent } from './form/form-estado-guia/form-estado-guia.component';
import { FormRetirosComponent } from './form/form-retiros/form-retiros.component';
import { MonederoComponent } from './component/monedero/monedero.component';
import { ListRetirosComponent } from './component/list-retiros/list-retiros.component';

const routes: Routes = [
  {
    path: "home",
    component: ElaboracionGuiasComponent
  },
  {
    path: "flete",
    component: FleteComponent,
  },
  {
    path: "formflete",
    component: FormFleteComponent
  },
  {
    path: "formflete/:id",
    component: FormFleteComponent
  },
  {
    path: "elaboracionguias",
    component: ElaboracionGuiasComponent
  },
  {
    path: "estadoGuias",
    component: EstadoGuiasComponent
  },
  {
    path: "guiadetalles/:id",
    component: FormEstadoGuiaComponent
  },
  {
    path: "solicitudrecogia",
    component: SolicitudRecogidaComponent
  },
  {
    path: "listrecogia",
    component: ListRecogiaComponent
  },
  {
    path: "solicitudrecogia/:id",
    component: SolicitudRecogidaComponent
  },
  {
    path: "perfil",
    component: PerfilComponent
  },
  {
    path: "relaciondespacho",
    component: RelacionDespachoComponent
  },
  {
    path: "tokenplataforma",
    component: TokenPlatformComponent
  },
  {
    path: "monedero",
    component: MonederoComponent
  },
  {
    path: "formRetiros/:id",
    component: FormRetirosComponent
  },
  {
    path: "formRetiros",
    component: FormRetirosComponent
  },
  {
    path: "listretiros",
    component: ListRetirosComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
