import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSidenavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareSurveyComponent } from './components/share-survey/share-survey.component';
import { SurveySectionComponent } from './components/survey-section/survey-section.component';
import { DragDropDirective } from './directive/drag-drop.directive';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    AlertPopupComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    ShareSurveyComponent,
    SurveySectionComponent,
    DragDropDirective,
    ConfirmDeleteComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [
    AlertPopupComponent,
    DashboardHeaderComponent,
    DashboardSidenavComponent,
    ShareSurveyComponent,
    SurveySectionComponent,
  ],
})
export class SharedModule {}
