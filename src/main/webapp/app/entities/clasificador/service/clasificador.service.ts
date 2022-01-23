import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IClasificador, getClasificadorIdentifier } from '../clasificador.model';

export type EntityResponseType = HttpResponse<IClasificador>;
export type EntityArrayResponseType = HttpResponse<IClasificador[]>;

@Injectable({ providedIn: 'root' })
export class ClasificadorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/clasificadors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(clasificador: IClasificador): Observable<EntityResponseType> {
    return this.http.post<IClasificador>(this.resourceUrl, clasificador, { observe: 'response' });
  }

  update(clasificador: IClasificador): Observable<EntityResponseType> {
    return this.http.put<IClasificador>(`${this.resourceUrl}/${getClasificadorIdentifier(clasificador) as number}`, clasificador, {
      observe: 'response',
    });
  }

  partialUpdate(clasificador: IClasificador): Observable<EntityResponseType> {
    return this.http.patch<IClasificador>(`${this.resourceUrl}/${getClasificadorIdentifier(clasificador) as number}`, clasificador, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClasificador>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClasificador[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addClasificadorToCollectionIfMissing(
    clasificadorCollection: IClasificador[],
    ...clasificadorsToCheck: (IClasificador | null | undefined)[]
  ): IClasificador[] {
    const clasificadors: IClasificador[] = clasificadorsToCheck.filter(isPresent);
    if (clasificadors.length > 0) {
      const clasificadorCollectionIdentifiers = clasificadorCollection.map(
        clasificadorItem => getClasificadorIdentifier(clasificadorItem)!
      );
      const clasificadorsToAdd = clasificadors.filter(clasificadorItem => {
        const clasificadorIdentifier = getClasificadorIdentifier(clasificadorItem);
        if (clasificadorIdentifier == null || clasificadorCollectionIdentifiers.includes(clasificadorIdentifier)) {
          return false;
        }
        clasificadorCollectionIdentifiers.push(clasificadorIdentifier);
        return true;
      });
      return [...clasificadorsToAdd, ...clasificadorCollection];
    }
    return clasificadorCollection;
  }
}
