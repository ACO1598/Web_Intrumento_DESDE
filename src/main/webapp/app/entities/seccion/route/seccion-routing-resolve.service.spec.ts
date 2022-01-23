jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISeccion, Seccion } from '../seccion.model';
import { SeccionService } from '../service/seccion.service';

import { SeccionRoutingResolveService } from './seccion-routing-resolve.service';

describe('Seccion routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: SeccionRoutingResolveService;
  let service: SeccionService;
  let resultSeccion: ISeccion | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(SeccionRoutingResolveService);
    service = TestBed.inject(SeccionService);
    resultSeccion = undefined;
  });

  describe('resolve', () => {
    it('should return ISeccion returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSeccion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSeccion).toEqual({ id: 123 });
    });

    it('should return new ISeccion if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSeccion = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultSeccion).toEqual(new Seccion());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Seccion })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultSeccion = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultSeccion).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
