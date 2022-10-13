import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserSurveyComponent } from './components/user-survey/user-survey.component';
import { SurveyPreviewComponent } from './components/survey-preview/survey-preview.component';
import { DefaultFooterComponent } from './components/default-footer/default-footer.component';

@NgModule({
  declarations: [DefaultComponent, HomeComponent, UserSurveyComponent, SurveyPreviewComponent, DefaultFooterComponent],
  imports: [CommonModule, DefaultRoutingModule, RouterModule, SharedModule],
})
export class DefaultModule {}
