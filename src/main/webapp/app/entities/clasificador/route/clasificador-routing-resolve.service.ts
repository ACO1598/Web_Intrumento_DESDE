import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IClasificador, Clasificador } from '../clasificador.model';
import { ClasificadorService } from '../service/clasificador.service';

@Injectable({ providedIn: 'root' })
export class ClasificadorRoutingResolveService implements Resolve<IClasificador> {
  constructor(protected service: ClasificadorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClasificador> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((clasificador: HttpResponse<Clasificador>) => {
          if (clasificador.body) {
            return of(clasificador.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Clasificador());
  }
}
