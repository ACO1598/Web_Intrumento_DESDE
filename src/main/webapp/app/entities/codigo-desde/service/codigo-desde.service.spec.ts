import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ICodigoDESDE, CodigoDESDE } from '../codigo-desde.model';

import { CodigoDESDEService } from './codigo-desde.service';

describe('CodigoDESDE Service', () => {
  let service: CodigoDESDEService;
  let httpMock: HttpTestingController;
  let elemDefault: ICodigoDESDE;
  let expectedResult: ICodigoDESDE | ICodigoDESDE[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CodigoDESDEService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      version: 'AAAAAAA',
      fecha: currentDate,
      introduccion: 'AAAAAAA',
      terminologiaComun: 'AAAAAAA',
      importanciaContexto: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      poblacionObjetivo: 'AAAAAAA',
      referencia: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a CodigoDESDE', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.create(new CodigoDESDE()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CodigoDESDE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          version: 'BBBBBB',
          fecha: currentDate.format(DATE_FORMAT),
          introduccion: 'BBBBBB',
          terminologiaComun: 'BBBBBB',
          importanciaContexto: 'BBBBBB',
          descripcion: 'BBBBBB',
          poblacionObjetivo: 'BBBBBB',
          referencia: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CodigoDESDE', () => {
      const patchObject = Object.assign(
        {
          version: 'BBBBBB',
          fecha: currentDate.format(DATE_FORMAT),
          terminologiaComun: 'BBBBBB',
          descripcion: 'BBBBBB',
        },
        new CodigoDESDE()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CodigoDESDE', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          version: 'BBBBBB',
          fecha: currentDate.format(DATE_FORMAT),
          introduccion: 'BBBBBB',
          terminologiaComun: 'BBBBBB',
          importanciaContexto: 'BBBBBB',
          descripcion: 'BBBBBB',
          poblacionObjetivo: 'BBBBBB',
          referencia: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a CodigoDESDE', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCodigoDESDEToCollectionIfMissing', () => {
      it('should add a CodigoDESDE to an empty array', () => {
        const codigoDESDE: ICodigoDESDE = { id: 123 };
        expectedResult = service.addCodigoDESDEToCollectionIfMissing([], codigoDESDE);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(codigoDESDE);
      });

      it('should not add a CodigoDESDE to an array that contains it', () => {
        const codigoDESDE: ICodigoDESDE = { id: 123 };
        const codigoDESDECollection: ICodigoDESDE[] = [
          {
            ...codigoDESDE,
          },
          { id: 456 },
        ];
        expectedResult = service.addCodigoDESDEToCollectionIfMissing(codigoDESDECollection, codigoDESDE);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CodigoDESDE to an array that doesn't contain it", () => {
        const codigoDESDE: ICodigoDESDE = { id: 123 };
        const codigoDESDECollection: ICodigoDESDE[] = [{ id: 456 }];
        expectedResult = service.addCodigoDESDEToCollectionIfMissing(codigoDESDECollection, codigoDESDE);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(codigoDESDE);
      });

      it('should add only unique CodigoDESDE to an array', () => {
        const codigoDESDEArray: ICodigoDESDE[] = [{ id: 123 }, { id: 456 }, { id: 5182 }];
        const codigoDESDECollection: ICodigoDESDE[] = [{ id: 123 }];
        expectedResult = service.addCodigoDESDEToCollectionIfMissing(codigoDESDECollection, ...codigoDESDEArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const codigoDESDE: ICodigoDESDE = { id: 123 };
        const codigoDESDE2: ICodigoDESDE = { id: 456 };
        expectedResult = service.addCodigoDESDEToCollectionIfMissing([], codigoDESDE, codigoDESDE2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(codigoDESDE);
        expect(expectedResult).toContain(codigoDESDE2);
      });

      it('should accept null and undefined values', () => {
        const codigoDESDE: ICodigoDESDE = { id: 123 };
        expectedResult = service.addCodigoDESDEToCollectionIfMissing([], null, codigoDESDE, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(codigoDESDE);
      });

      it('should return initial array if no CodigoDESDE is added', () => {
        const codigoDESDECollection: ICodigoDESDE[] = [{ id: 123 }];
        expectedResult = service.addCodigoDESDEToCollectionIfMissing(codigoDESDECollection, undefined, null);
        expect(expectedResult).toEqual(codigoDESDECollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
