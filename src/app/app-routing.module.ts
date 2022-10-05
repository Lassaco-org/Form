import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./default/default.module').then((m: any) => m.DefaultModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m: any) => m.AuthenticationModule
      ),
  },
  {
    path: 'admin',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m: any) => m.AdminModule),
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Not Found',
      description: 'Description Meta Tag Content',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // scrollPositionRestoration: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
