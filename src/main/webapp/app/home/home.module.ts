import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeElementComponent } from './home-element/home-element.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, HomeListComponent, HomeElementComponent],
})
export class HomeModule {}
