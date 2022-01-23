import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IIdentificador, Identificador } from '../identificador.model';
import { IdentificadorService } from '../service/identificador.service';

@Injectable({ providedIn: 'root' })
export class IdentificadorRoutingResolveService implements Resolve<IIdentificador> {
  constructor(protected service: IdentificadorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIdentificador> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((identificador: HttpResponse<Identificador>) => {
          if (identificador.body) {
            return of(identificador.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Identificador());
  }
}
