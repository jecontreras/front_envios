import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registrate/:username',
        loadChildren: () => import('./component/auth-signup/auth-signup.module').then(module => module.AuthSignupModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./component/auth-signin/auth-signin.module').then(module => module.AuthSigninModule)
      },
      {
        path: 'login/:id',
        loadChildren: () => import('./component/auth-signin/auth-signin.module').then(module => module.AuthSigninModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./component/auth-reset-password/auth-reset-password.module').then(module => module.AuthResetPasswordModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./component/auth-change-password/auth-change-password.module').then(module => module.AuthChangePasswordModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
