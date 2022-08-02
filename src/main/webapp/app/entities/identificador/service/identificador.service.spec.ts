import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IIdentificador, Identificador } from '../identificador.model';

import { IdentificadorService } from './identificador.service';

describe('Identificador Service', () => {
  let service: IdentificadorService;
  let httpMock: HttpTestingController;
  let elemDefault: IIdentificador;
  let expectedResult: IIdentificador | IIdentificador[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(IdentificadorService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
      codigo: 'AAAAAAA',
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

    it('should create a Identificador', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Identificador()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Identificador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          codigo: 'BBBBBB',
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

    it('should partial update a Identificador', () => {
      const patchObject = Object.assign(
        {
          codigo: 'BBBBBB',
          ejemplos: 'BBBBBB',
        },
        new Identificador()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Identificador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
          codigo: 'BBBBBB',
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

    it('should delete a Identificador', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addIdentificadorToCollectionIfMissing', () => {
      it('should add a Identificador to an empty array', () => {
        const identificador: IIdentificador = { id: 123 };
        expectedResult = service.addIdentificadorToCollectionIfMissing([], identificador);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(identificador);
      });

      it('should not add a Identificador to an array that contains it', () => {
        const identificador: IIdentificador = { id: 123 };
        const identificadorCollection: IIdentificador[] = [
          {
            ...identificador,
          },
          { id: 456 },
        ];
        expectedResult = service.addIdentificadorToCollectionIfMissing(identificadorCollection, identificador);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Identificador to an array that doesn't contain it", () => {
        const identificador: IIdentificador = { id: 123 };
        const identificadorCollection: IIdentificador[] = [{ id: 456 }];
        expectedResult = service.addIdentificadorToCollectionIfMissing(identificadorCollection, identificador);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(identificador);
      });

      it('should add only unique Identificador to an array', () => {
        const identificadorArray: IIdentificador[] = [{ id: 123 }, { id: 456 }, { id: 71117 }];
        const identificadorCollection: IIdentificador[] = [{ id: 123 }];
        expectedResult = service.addIdentificadorToCollectionIfMissing(identificadorCollection, ...identificadorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const identificador: IIdentificador = { id: 123 };
        const identificador2: IIdentificador = { id: 456 };
        expectedResult = service.addIdentificadorToCollectionIfMissing([], identificador, identificador2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(identificador);
        expect(expectedResult).toContain(identificador2);
      });

      it('should accept null and undefined values', () => {
        const identificador: IIdentificador = { id: 123 };
        expectedResult = service.addIdentificadorToCollectionIfMissing([], null, identificador, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(identificador);
      });

      it('should return initial array if no Identificador is added', () => {
        const identificadorCollection: IIdentificador[] = [{ id: 123 }];
        expectedResult = service.addIdentificadorToCollectionIfMissing(identificadorCollection, undefined, null);
        expect(expectedResult).toEqual(identificadorCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
