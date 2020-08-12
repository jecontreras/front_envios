import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FleteComponent } from './component/flete/flete.component';
import { FormFleteComponent } from './form/form-flete/form-flete.component';

const routes: Routes = [
  {
    path: "home",
    component: FleteComponent
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
