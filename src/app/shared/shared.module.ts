import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidenavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareSurveyComponent } from './components/share-survey/share-survey.component';
import { SurveyResponseComponent } from './components/survey-response/survey-response.component';
import { SurveySectionComponent } from './components/survey-section/survey-section.component';

@NgModule({
  declarations: [
    AlertPopupComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    ShareSurveyComponent,
    SurveyResponseComponent,
    SurveySectionComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    AlertPopupComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    ShareSurveyComponent,
    SurveyResponseComponent,
    SurveySectionComponent,
  ],
})
export class SharedModule {}
