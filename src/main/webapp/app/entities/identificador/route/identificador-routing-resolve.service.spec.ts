jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IIdentificador, Identificador } from '../identificador.model';
import { IdentificadorService } from '../service/identificador.service';

import { IdentificadorRoutingResolveService } from './identificador-routing-resolve.service';

describe('Identificador routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: IdentificadorRoutingResolveService;
  let service: IdentificadorService;
  let resultIdentificador: IIdentificador | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(IdentificadorRoutingResolveService);
    service = TestBed.inject(IdentificadorService);
    resultIdentificador = undefined;
  });

  describe('resolve', () => {
    it('should return IIdentificador returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultIdentificador = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultIdentificador).toEqual({ id: 123 });
    });

    it('should return new IIdentificador if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultIdentificador = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultIdentificador).toEqual(new Identificador());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Identificador })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultIdentificador = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultIdentificador).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
