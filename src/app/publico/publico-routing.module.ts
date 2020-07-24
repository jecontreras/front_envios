import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicacionviewsComponent } from './component/publicacionviews/publicacionviews.component';
import { MarkeplaceComponent } from './component/markeplace/markeplace.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "",
        component: PublicacionviewsComponent
      },
      {
        path: "markeplace",
        component: MarkeplaceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicoRoutingModule { }
