import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SurveyPreviewComponent } from './components/survey-preview/survey-preview.component';
import { UserSurveyComponent } from './components/user-survey/user-survey.component';
import { DefaultComponent } from './default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Home',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'surveys/:surveyId',
        component: UserSurveyComponent,
        data: {
          title: 'Survey',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'surveys/:surveyId/survey-preview',
        component: SurveyPreviewComponent,
        data: {
          title: 'Preview Survey',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: '/', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
