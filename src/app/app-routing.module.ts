import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthService } from './services/auth.service';
import { PublicoComponent } from './theme/layout/publico/publico.component';
import { PortadaComponent } from './theme/layout/portada/portada.component';

const routes: Routes = [
  {
    path: "",
    component: PortadaComponent,
    children: [
      {
        path: '',
        redirectTo: 'portada/index',
        pathMatch: 'full'
      },
      {
        path: "portada",
        loadChildren: () => import('./portada/portada.module').then( module => module.PortadaModule )
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [ AuthService ],
    children: [
      // {
      //   path: '',
      //   redirectTo: 'dashboard/home',
      //   pathMatch: 'full'
      // },
      {
        path: 'dashboard',
        loadChildren: () => import ('./page/pages.module').then( module => module.PagesModule )
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/authentication.module').then(module => module.AuthenticationModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./demo/pages/maintenance/maintenance.module').then(module => module.MaintenanceModule)
      }
    ]
  },
  { 
    path: '',
    component: PublicoComponent,
    children: [
      {
        path: "publico",
        loadChildren: () => import('./publico/publico.module').then(module => module.PublicoModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
