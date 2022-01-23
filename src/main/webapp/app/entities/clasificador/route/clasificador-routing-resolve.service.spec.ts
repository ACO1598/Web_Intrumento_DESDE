jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IClasificador, Clasificador } from '../clasificador.model';
import { ClasificadorService } from '../service/clasificador.service';

import { ClasificadorRoutingResolveService } from './clasificador-routing-resolve.service';

describe('Clasificador routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ClasificadorRoutingResolveService;
  let service: ClasificadorService;
  let resultClasificador: IClasificador | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(ClasificadorRoutingResolveService);
    service = TestBed.inject(ClasificadorService);
    resultClasificador = undefined;
  });

  describe('resolve', () => {
    it('should return IClasificador returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultClasificador = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultClasificador).toEqual({ id: 123 });
    });

    it('should return new IClasificador if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultClasificador = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultClasificador).toEqual(new Clasificador());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Clasificador })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultClasificador = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultClasificador).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
