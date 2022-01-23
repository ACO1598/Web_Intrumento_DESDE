import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { IdentificadorComponent } from '../list/identificador.component';
import { IdentificadorDetailComponent } from '../detail/identificador-detail.component';
import { IdentificadorUpdateComponent } from '../update/identificador-update.component';
import { IdentificadorRoutingResolveService } from './identificador-routing-resolve.service';

const identificadorRoute: Routes = [
  {
    path: '',
    component: IdentificadorComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: IdentificadorDetailComponent,
    resolve: {
      identificador: IdentificadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: IdentificadorUpdateComponent,
    resolve: {
      identificador: IdentificadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: IdentificadorUpdateComponent,
    resolve: {
      identificador: IdentificadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(identificadorRoute)],
  exports: [RouterModule],
})
export class IdentificadorRoutingModule {}
