import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CodigoDESDEComponent } from '../list/codigo-desde.component';
import { CodigoDESDEDetailComponent } from '../detail/codigo-desde-detail.component';
import { CodigoDESDEUpdateComponent } from '../update/codigo-desde-update.component';
import { CodigoDESDERoutingResolveService } from './codigo-desde-routing-resolve.service';

const codigoDESDERoute: Routes = [
  {
    path: '',
    component: CodigoDESDEComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CodigoDESDEDetailComponent,
    resolve: {
      codigoDESDE: CodigoDESDERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CodigoDESDEUpdateComponent,
    resolve: {
      codigoDESDE: CodigoDESDERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CodigoDESDEUpdateComponent,
    resolve: {
      codigoDESDE: CodigoDESDERoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(codigoDESDERoute)],
  exports: [RouterModule],
})
export class CodigoDESDERoutingModule {}
