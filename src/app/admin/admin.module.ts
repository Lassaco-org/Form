import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { SharedModule } from '../shared/shared.module';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { AdminSettingComponent } from './components/admin-setting/admin-setting.component';
import { DisplayAdminUsersComponent } from './components/admin-users/display-admin-users/display-admin-users.component';
import { AddAdminUserComponent } from './components/admin-users/add-admin-user/add-admin-user.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminOverviewComponent,
    AdminFormComponent,
    AdminSettingComponent,
    DisplayAdminUsersComponent,
    AddAdminUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
