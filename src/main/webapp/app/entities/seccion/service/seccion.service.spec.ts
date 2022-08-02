import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISeccion, Seccion } from '../seccion.model';

import { SeccionService } from './seccion.service';

describe('Seccion Service', () => {
  let service: SeccionService;
  let httpMock: HttpTestingController;
  let elemDefault: ISeccion;
  let expectedResult: ISeccion | ISeccion[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SeccionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      descripcion: 'AAAAAAA',
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

    it('should create a Seccion', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Seccion()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Seccion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Seccion', () => {
      const patchObject = Object.assign(
        {
          nombre: 'BBBBBB',
        },
        new Seccion()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Seccion', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          descripcion: 'BBBBBB',
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

    it('should delete a Seccion', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addSeccionToCollectionIfMissing', () => {
      it('should add a Seccion to an empty array', () => {
        const seccion: ISeccion = { id: 123 };
        expectedResult = service.addSeccionToCollectionIfMissing([], seccion);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(seccion);
      });

      it('should not add a Seccion to an array that contains it', () => {
        const seccion: ISeccion = { id: 123 };
        const seccionCollection: ISeccion[] = [
          {
            ...seccion,
          },
          { id: 456 },
        ];
        expectedResult = service.addSeccionToCollectionIfMissing(seccionCollection, seccion);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Seccion to an array that doesn't contain it", () => {
        const seccion: ISeccion = { id: 123 };
        const seccionCollection: ISeccion[] = [{ id: 456 }];
        expectedResult = service.addSeccionToCollectionIfMissing(seccionCollection, seccion);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(seccion);
      });

      it('should add only unique Seccion to an array', () => {
        const seccionArray: ISeccion[] = [{ id: 123 }, { id: 456 }, { id: 56664 }];
        const seccionCollection: ISeccion[] = [{ id: 123 }];
        expectedResult = service.addSeccionToCollectionIfMissing(seccionCollection, ...seccionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const seccion: ISeccion = { id: 123 };
        const seccion2: ISeccion = { id: 456 };
        expectedResult = service.addSeccionToCollectionIfMissing([], seccion, seccion2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(seccion);
        expect(expectedResult).toContain(seccion2);
      });

      it('should accept null and undefined values', () => {
        const seccion: ISeccion = { id: 123 };
        expectedResult = service.addSeccionToCollectionIfMissing([], null, seccion, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(seccion);
      });

      it('should return initial array if no Seccion is added', () => {
        const seccionCollection: ISeccion[] = [{ id: 123 }];
        expectedResult = service.addSeccionToCollectionIfMissing(seccionCollection, undefined, null);
        expect(expectedResult).toEqual(seccionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
