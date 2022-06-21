import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeElementComponent } from './home-element/home-element.component';

export const HOME_ROUTE: Route = [
  {
    path: '',
    component: HomeComponent,
    data: {
      pageTitle: 'home.title',
    },
  },
  {
    path: 'home-element/:id',
    component: HomeElementComponent,
  },
];
