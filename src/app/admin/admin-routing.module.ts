import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AdminSettingComponent } from './components/admin-setting/admin-setting.component';
import { AddAdminUserComponent } from './components/admin-users/add-admin-user/add-admin-user.component';
import { DisplayAdminUsersComponent } from './components/admin-users/display-admin-users/display-admin-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminOverviewComponent,
        data: {
          title: 'Overview',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'forms',
        component: AdminFormComponent,
        data: {
          title: 'Forms',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'users',
        component: DisplayAdminUsersComponent,
        data: {
          title: 'Users',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'add-user',
        component: AddAdminUserComponent,
        data: {
          title: 'Users',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'settings',
        component: AdminSettingComponent,
        data: {
          title: 'Settings',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: '/admin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
