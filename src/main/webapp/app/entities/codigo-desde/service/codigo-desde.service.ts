import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICodigoDESDE, getCodigoDESDEIdentifier } from '../codigo-desde.model';

export type EntityResponseType = HttpResponse<ICodigoDESDE>;
export type EntityArrayResponseType = HttpResponse<ICodigoDESDE[]>;

@Injectable({ providedIn: 'root' })
export class CodigoDESDEService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/codigo-desdes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(codigoDESDE: ICodigoDESDE): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(codigoDESDE);
    return this.http
      .post<ICodigoDESDE>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(codigoDESDE: ICodigoDESDE): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(codigoDESDE);
    return this.http
      .put<ICodigoDESDE>(`${this.resourceUrl}/${getCodigoDESDEIdentifier(codigoDESDE) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(codigoDESDE: ICodigoDESDE): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(codigoDESDE);
    return this.http
      .patch<ICodigoDESDE>(`${this.resourceUrl}/${getCodigoDESDEIdentifier(codigoDESDE) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICodigoDESDE>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICodigoDESDE[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  trackId(index: number, item: ICodigoDESDE): number {
    return item.id!;
  }

  addCodigoDESDEToCollectionIfMissing(
    codigoDESDECollection: ICodigoDESDE[],
    ...codigoDESDESToCheck: (ICodigoDESDE | null | undefined)[]
  ): ICodigoDESDE[] {
    const codigoDESDES: ICodigoDESDE[] = codigoDESDESToCheck.filter(isPresent);
    if (codigoDESDES.length > 0) {
      const codigoDESDECollectionIdentifiers = codigoDESDECollection.map(codigoDESDEItem => getCodigoDESDEIdentifier(codigoDESDEItem)!);
      const codigoDESDESToAdd = codigoDESDES.filter(codigoDESDEItem => {
        const codigoDESDEIdentifier = getCodigoDESDEIdentifier(codigoDESDEItem);
        if (codigoDESDEIdentifier == null || codigoDESDECollectionIdentifiers.includes(codigoDESDEIdentifier)) {
          return false;
        }
        codigoDESDECollectionIdentifiers.push(codigoDESDEIdentifier);
        return true;
      });
      return [...codigoDESDESToAdd, ...codigoDESDECollection];
    }
    return codigoDESDECollection;
  }

  protected convertDateFromClient(codigoDESDE: ICodigoDESDE): ICodigoDESDE {
    return Object.assign({}, codigoDESDE, {
      fecha: codigoDESDE.fecha?.isValid() ? codigoDESDE.fecha.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((codigoDESDE: ICodigoDESDE) => {
        codigoDESDE.fecha = codigoDESDE.fecha ? dayjs(codigoDESDE.fecha) : undefined;
      });
    }
    return res;
  }
}
