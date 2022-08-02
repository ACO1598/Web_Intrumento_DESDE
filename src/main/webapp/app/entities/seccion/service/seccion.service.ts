import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISeccion, getSeccionIdentifier } from '../seccion.model';

export type EntityResponseType = HttpResponse<ISeccion>;
export type EntityArrayResponseType = HttpResponse<ISeccion[]>;

@Injectable({ providedIn: 'root' })
export class SeccionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/seccions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(seccion: ISeccion): Observable<EntityResponseType> {
    return this.http.post<ISeccion>(this.resourceUrl, seccion, { observe: 'response' });
  }

  update(seccion: ISeccion): Observable<EntityResponseType> {
    return this.http.put<ISeccion>(`${this.resourceUrl}/${getSeccionIdentifier(seccion) as number}`, seccion, { observe: 'response' });
  }

  partialUpdate(seccion: ISeccion): Observable<EntityResponseType> {
    return this.http.patch<ISeccion>(`${this.resourceUrl}/${getSeccionIdentifier(seccion) as number}`, seccion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISeccion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISeccion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSeccionToCollectionIfMissing(seccionCollection: ISeccion[], ...seccionsToCheck: (ISeccion | null | undefined)[]): ISeccion[] {
    const seccions: ISeccion[] = seccionsToCheck.filter(isPresent);
    if (seccions.length > 0) {
      const seccionCollectionIdentifiers = seccionCollection.map(seccionItem => getSeccionIdentifier(seccionItem)!);
      const seccionsToAdd = seccions.filter(seccionItem => {
        const seccionIdentifier = getSeccionIdentifier(seccionItem);
        if (seccionIdentifier == null || seccionCollectionIdentifiers.includes(seccionIdentifier)) {
          return false;
        }
        seccionCollectionIdentifiers.push(seccionIdentifier);
        return true;
      });
      return [...seccionsToAdd, ...seccionCollection];
    }
    return seccionCollection;
  }
}
