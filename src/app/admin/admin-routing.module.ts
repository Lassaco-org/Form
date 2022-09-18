import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   component: AuthenticationComponent,
      //   data: {
      //     title: 'Auth',
      //     description: 'Description Meta Tag Content',
      //   },
      // },
      // {
      //   path: 'login',
      //   component: LoginComponent,
      //   data: {
      //     title: 'Login',
      //     description: 'Description Meta Tag Content',
      //   },
      // },
      { path: '', redirectTo: '/admin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
