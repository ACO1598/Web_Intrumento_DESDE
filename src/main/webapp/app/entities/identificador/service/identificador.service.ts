import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IIdentificador, getIdentificadorIdentifier } from '../identificador.model';

export type EntityResponseType = HttpResponse<IIdentificador>;
export type EntityArrayResponseType = HttpResponse<IIdentificador[]>;

@Injectable({ providedIn: 'root' })
export class IdentificadorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/identificadors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(identificador: IIdentificador): Observable<EntityResponseType> {
    return this.http.post<IIdentificador>(this.resourceUrl, identificador, { observe: 'response' });
  }

  update(identificador: IIdentificador): Observable<EntityResponseType> {
    return this.http.put<IIdentificador>(`${this.resourceUrl}/${getIdentificadorIdentifier(identificador) as number}`, identificador, {
      observe: 'response',
    });
  }

  partialUpdate(identificador: IIdentificador): Observable<EntityResponseType> {
    return this.http.patch<IIdentificador>(`${this.resourceUrl}/${getIdentificadorIdentifier(identificador) as number}`, identificador, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIdentificador>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIdentificador[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addIdentificadorToCollectionIfMissing(
    identificadorCollection: IIdentificador[],
    ...identificadorsToCheck: (IIdentificador | null | undefined)[]
  ): IIdentificador[] {
    const identificadors: IIdentificador[] = identificadorsToCheck.filter(isPresent);
    if (identificadors.length > 0) {
      const identificadorCollectionIdentifiers = identificadorCollection.map(
        identificadorItem => getIdentificadorIdentifier(identificadorItem)!
      );
      const identificadorsToAdd = identificadors.filter(identificadorItem => {
        const identificadorIdentifier = getIdentificadorIdentifier(identificadorItem);
        if (identificadorIdentifier == null || identificadorCollectionIdentifiers.includes(identificadorIdentifier)) {
          return false;
        }
        identificadorCollectionIdentifiers.push(identificadorIdentifier);
        return true;
      });
      return [...identificadorsToAdd, ...identificadorCollection];
    }
    return identificadorCollection;
  }
}
