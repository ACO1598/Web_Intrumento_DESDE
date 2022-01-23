import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IClasificador, Clasificador } from '../clasificador.model';

import { ClasificadorService } from './clasificador.service';

describe('Clasificador Service', () => {
  let service: ClasificadorService;
  let httpMock: HttpTestingController;
  let elemDefault: IClasificador;
  let expectedResult: IClasificador | IClasificador[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ClasificadorService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      ejemplos: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Clasificador', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Clasificador()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Clasificador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
          ejemplos: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Clasificador', () => {
      const patchObject = Object.assign(
        {
          nombre: 'BBBBBB',
        },
        new Clasificador()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Clasificador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
          ejemplos: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Clasificador', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addClasificadorToCollectionIfMissing', () => {
      it('should add a Clasificador to an empty array', () => {
        const clasificador: IClasificador = { id: 123 };
        expectedResult = service.addClasificadorToCollectionIfMissing([], clasificador);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(clasificador);
      });

      it('should not add a Clasificador to an array that contains it', () => {
        const clasificador: IClasificador = { id: 123 };
        const clasificadorCollection: IClasificador[] = [
          {
            ...clasificador,
          },
          { id: 456 },
        ];
        expectedResult = service.addClasificadorToCollectionIfMissing(clasificadorCollection, clasificador);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Clasificador to an array that doesn't contain it", () => {
        const clasificador: IClasificador = { id: 123 };
        const clasificadorCollection: IClasificador[] = [{ id: 456 }];
        expectedResult = service.addClasificadorToCollectionIfMissing(clasificadorCollection, clasificador);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(clasificador);
      });

      it('should add only unique Clasificador to an array', () => {
        const clasificadorArray: IClasificador[] = [{ id: 123 }, { id: 456 }, { id: 52832 }];
        const clasificadorCollection: IClasificador[] = [{ id: 123 }];
        expectedResult = service.addClasificadorToCollectionIfMissing(clasificadorCollection, ...clasificadorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const clasificador: IClasificador = { id: 123 };
        const clasificador2: IClasificador = { id: 456 };
        expectedResult = service.addClasificadorToCollectionIfMissing([], clasificador, clasificador2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(clasificador);
        expect(expectedResult).toContain(clasificador2);
      });

      it('should accept null and undefined values', () => {
        const clasificador: IClasificador = { id: 123 };
        expectedResult = service.addClasificadorToCollectionIfMissing([], null, clasificador, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(clasificador);
      });

      it('should return initial array if no Clasificador is added', () => {
        const clasificadorCollection: IClasificador[] = [{ id: 123 }];
        expectedResult = service.addClasificadorToCollectionIfMissing(clasificadorCollection, undefined, null);
        expect(expectedResult).toEqual(clasificadorCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
