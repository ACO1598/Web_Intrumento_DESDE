import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeSeccionComponent } from './home-seccion/home-seccion.component';

import { SeccionRoutingResolveService } from 'app/entities/seccion/route/seccion-routing-resolve.service';

export const HOME_ROUTE: Routes = [
  {
    path: 'list/seccion/:nombre',
    component: HomeSeccionComponent,
    resolve: {
      seccion: SeccionRoutingResolveService,
    },
  },
  {
    path: '',
    component: HomeListComponent,
    data: {
      pageTitle: 'home.title',
    },
  },
  /*	{
  		path: '',
  		component: HomeComponent,
  		data: {
    		pageTitle: 'home.title',
  		},
	},*/
];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTE)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
