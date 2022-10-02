import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { SharedModule } from '../shared/shared.module';
import { AdminSettingComponent } from './components/admin-setting/admin-setting.component';
import { DisplaySubAdminsComponent } from './components/sub-admins/display-sub-admins/display-sub-admins.component';
import { AddSubAdminComponent } from './components/sub-admins/add-sub-admin/add-sub-admin.component';
import { DisplaySurveyQuestionsComponent } from './components/admin-surveys/display-survey-questions/display-survey-questions.component';
import { AddSurveyQuestionComponent } from './components/admin-surveys/add-survey-question/add-survey-question.component';
import { DisplaySurveyResponsesComponent } from './components/admin-surveys/display-survey-responses/display-survey-responses.component';
import { AdminSurveysOverviewComponent } from './components/admin-surveys/admin-surveys-overview/admin-surveys-overview.component';
import { CreateSurveyComponent } from './components/admin-surveys/create-survey/create-survey.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminOverviewComponent,
    AdminSettingComponent,
    DisplaySubAdminsComponent,
    AddSubAdminComponent,
    DisplaySurveyQuestionsComponent,
    AddSurveyQuestionComponent,
    DisplaySurveyResponsesComponent,
    AdminSurveysOverviewComponent,
    CreateSurveyComponent,
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
