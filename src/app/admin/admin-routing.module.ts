import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AdminSettingComponent } from './components/admin-setting/admin-setting.component';
import { AddSurveyQuestionComponent } from './components/admin-surveys/add-survey-question/add-survey-question.component';
import { AdminSurveysOverviewComponent } from './components/admin-surveys/admin-surveys-overview/admin-surveys-overview.component';
import { CreateSurveyComponent } from './components/admin-surveys/create-survey/create-survey.component';
import { DisplaySurveyResponsesComponent } from './components/admin-surveys/display-survey-responses/display-survey-responses.component';
import { EditSurveyQuestionComponent } from './components/admin-surveys/edit-survey-question/edit-survey-question.component';
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
        component: AdminSurveysOverviewComponent,
        data: {
          title: 'Surveys',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'create-survey',
        component: CreateSurveyComponent,
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
        path: 'survey-response',
        component: DisplaySurveyResponsesComponent,
        data: {
          title: 'Surveys',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: ':shortCode/edit-survey',
        component: EditSurveyQuestionComponent,
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
