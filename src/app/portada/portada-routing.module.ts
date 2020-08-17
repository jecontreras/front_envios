import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { TerminosComponent } from './component/terminos/terminos.component';

const routes: Routes = [
  {
    path: "index",
    component: IndexComponent
  },
  {
    path: "terminos",
    component: TerminosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortadaRoutingModule { }
