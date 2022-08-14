import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HomeRoutingModule } from './home.route';
import { HomeComponent } from './home.component';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeElementComponent } from './home-element/home-element.component';
import { HomeSeccionComponent } from './home-seccion/home-seccion.component';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [HomeComponent, HomeListComponent, HomeElementComponent, HomeSeccionComponent],
})
export class HomeModule {}
