import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m: any) => m.AuthenticationModule
      ),
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
