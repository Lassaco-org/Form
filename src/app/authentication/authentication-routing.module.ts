import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      // {
      //   path: '',
      //   component: AuthenticationComponent,
      //   data: {
      //     title: 'Auth',
      //     description: 'Description Meta Tag Content',
      //   },
      // },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: 'Forgot Password',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Password',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
