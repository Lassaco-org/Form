import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [CommonModule, AuthenticationRoutingModule, RouterModule],
})
export class AuthenticationModule {}
