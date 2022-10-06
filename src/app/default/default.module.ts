import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SurveyPreviewComponent } from './components/survey-preview/survey-preview.component';

@NgModule({
  declarations: [DefaultComponent, HomeComponent, SurveyPreviewComponent],
  imports: [CommonModule, DefaultRoutingModule, RouterModule],
})
export class DefaultModule {}
