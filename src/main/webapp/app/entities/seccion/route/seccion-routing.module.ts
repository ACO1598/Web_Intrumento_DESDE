import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SeccionComponent } from '../list/seccion.component';
import { SeccionDetailComponent } from '../detail/seccion-detail.component';
import { SeccionUpdateComponent } from '../update/seccion-update.component';
import { SeccionRoutingResolveService } from './seccion-routing-resolve.service';

const seccionRoute: Routes = [
  {
    path: '',
    component: SeccionComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SeccionDetailComponent,
    resolve: {
      seccion: SeccionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SeccionUpdateComponent,
    resolve: {
      seccion: SeccionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SeccionUpdateComponent,
    resolve: {
      seccion: SeccionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(seccionRoute)],
  exports: [RouterModule],
})
export class SeccionRoutingModule {}
