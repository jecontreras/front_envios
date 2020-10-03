import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { TerminosComponent } from './component/terminos/terminos.component';
import { ConfigurarPagosComponent } from './component/configurar-pagos/configurar-pagos.component';
import { FormGuiaDetallesComponent } from './component/form-guia-detalles/form-guia-detalles.component';

const routes: Routes = [
  {
    path: "index",
    component: IndexComponent
  },
  {
    path: "terminos",
    component: TerminosComponent
  },
  {
    path: "configurarpagos",
    component: ConfigurarPagosComponent
  },
  {
    path: "guiadetalles",
    component: FormGuiaDetallesComponent
  },
  {
    path: "guiadetalles/:id",
    component: FormGuiaDetallesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortadaRoutingModule { }
