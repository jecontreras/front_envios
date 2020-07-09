import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicacionviewsComponent } from './component/publicacionviews/publicacionviews.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "",
        component: PublicacionviewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicoRoutingModule { }
