import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICodigoDESDE, CodigoDESDE } from '../codigo-desde.model';
import { CodigoDESDEService } from '../service/codigo-desde.service';

@Injectable({ providedIn: 'root' })
export class CodigoDESDERoutingResolveService implements Resolve<ICodigoDESDE> {
  constructor(protected service: CodigoDESDEService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICodigoDESDE> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((codigoDESDE: HttpResponse<CodigoDESDE>) => {
          if (codigoDESDE.body) {
            return of(codigoDESDE.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CodigoDESDE());
  }
}
