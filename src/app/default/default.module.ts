import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DefaultComponent, HomeComponent],
  imports: [CommonModule, DefaultRoutingModule, RouterModule],
})
export class DefaultModule {}
