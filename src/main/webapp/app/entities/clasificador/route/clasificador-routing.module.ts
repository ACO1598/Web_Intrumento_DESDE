import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ClasificadorComponent } from '../list/clasificador.component';
import { ClasificadorDetailComponent } from '../detail/clasificador-detail.component';
import { ClasificadorUpdateComponent } from '../update/clasificador-update.component';
import { ClasificadorRoutingResolveService } from './clasificador-routing-resolve.service';

const clasificadorRoute: Routes = [
  {
    path: '',
    component: ClasificadorComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClasificadorDetailComponent,
    resolve: {
      clasificador: ClasificadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClasificadorUpdateComponent,
    resolve: {
      clasificador: ClasificadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClasificadorUpdateComponent,
    resolve: {
      clasificador: ClasificadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(clasificadorRoute)],
  exports: [RouterModule],
})
export class ClasificadorRoutingModule {}
