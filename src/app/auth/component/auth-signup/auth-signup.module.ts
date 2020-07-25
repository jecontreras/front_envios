import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSignupRoutingModule } from './auth-signup-routing.module';
import { AuthSignupComponent } from './auth-signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AuthSignupRoutingModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
