import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISeccion, Seccion } from '../seccion.model';
import { SeccionService } from '../service/seccion.service';

@Injectable({ providedIn: 'root' })
export class SeccionRoutingResolveService implements Resolve<ISeccion> {
  constructor(protected service: SeccionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISeccion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((seccion: HttpResponse<Seccion>) => {
          if (seccion.body) {
            return of(seccion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Seccion());
  }
}
