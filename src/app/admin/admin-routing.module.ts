import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AdminSettingComponent } from './components/admin-setting/admin-setting.component';
import { AddSurveyQuestionComponent } from './components/admin-surveys/add-survey-question/add-survey-question.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { AddSubAdminComponent } from './components/sub-admins/add-sub-admin/add-sub-admin.component';
import { DisplaySubAdminsComponent } from './components/sub-admins/display-sub-admins/display-sub-admins.component';

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
        path: 'surveys',
        component: AdminSurveysComponent,
        data: {
          title: 'Surveys',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'add-question',
        component: AddSurveyQuestionComponent,
        data: {
          title: 'Surveys',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'display-admins',
        component: DisplaySubAdminsComponent,
        data: {
          title: 'All Admins',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'add-admin',
        component: AddSubAdminComponent,
        data: {
          title: 'All Admins',
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
