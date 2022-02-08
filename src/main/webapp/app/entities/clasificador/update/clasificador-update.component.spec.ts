jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ClasificadorService } from '../service/clasificador.service';
import { IClasificador, Clasificador } from '../clasificador.model';
import { ISeccion } from 'app/entities/seccion/seccion.model';
import { SeccionService } from 'app/entities/seccion/service/seccion.service';

import { ClasificadorUpdateComponent } from './clasificador-update.component';

describe('Component Tests', () => {
  describe('Clasificador Management Update Component', () => {
    let comp: ClasificadorUpdateComponent;
    let fixture: ComponentFixture<ClasificadorUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let clasificadorService: ClasificadorService;
    let seccionService: SeccionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ClasificadorUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ClasificadorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClasificadorUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      clasificadorService = TestBed.inject(ClasificadorService);
      seccionService = TestBed.inject(SeccionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Clasificador query and add missing value', () => {
        const clasificador: IClasificador = { id: 456 };
        const hijoC: IClasificador = { id: 15459 };
        clasificador.hijoC = hijoC;

        const clasificadorCollection: IClasificador[] = [{ id: 35782 }];
        jest.spyOn(clasificadorService, 'query').mockReturnValue(of(new HttpResponse({ body: clasificadorCollection })));
        const additionalClasificadors = [hijoC];
        const expectedCollection: IClasificador[] = [...additionalClasificadors, ...clasificadorCollection];
        jest.spyOn(clasificadorService, 'addClasificadorToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ clasificador });
        comp.ngOnInit();

        expect(clasificadorService.query).toHaveBeenCalled();
        expect(clasificadorService.addClasificadorToCollectionIfMissing).toHaveBeenCalledWith(
          clasificadorCollection,
          ...additionalClasificadors
        );
        expect(comp.clasificadorsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Seccion query and add missing value', () => {
        const clasificador: IClasificador = { id: 456 };
        const seccion: ISeccion = { id: 74121 };
        clasificador.seccion = seccion;

        const seccionCollection: ISeccion[] = [{ id: 97231 }];
        jest.spyOn(seccionService, 'query').mockReturnValue(of(new HttpResponse({ body: seccionCollection })));
        const additionalSeccions = [seccion];
        const expectedCollection: ISeccion[] = [...additionalSeccions, ...seccionCollection];
        jest.spyOn(seccionService, 'addSeccionToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ clasificador });
        comp.ngOnInit();

        expect(seccionService.query).toHaveBeenCalled();
        expect(seccionService.addSeccionToCollectionIfMissing).toHaveBeenCalledWith(seccionCollection, ...additionalSeccions);
        expect(comp.seccionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const clasificador: IClasificador = { id: 456 };
        const hijoC: IClasificador = { id: 89809 };
        clasificador.hijoC = hijoC;
        const seccion: ISeccion = { id: 89905 };
        clasificador.seccion = seccion;

        activatedRoute.data = of({ clasificador });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(clasificador));
        expect(comp.clasificadorsSharedCollection).toContain(hijoC);
        expect(comp.seccionsSharedCollection).toContain(seccion);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Clasificador>>();
        const clasificador = { id: 123 };
        jest.spyOn(clasificadorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ clasificador });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: clasificador }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(clasificadorService.update).toHaveBeenCalledWith(clasificador);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Clasificador>>();
        const clasificador = new Clasificador();
        jest.spyOn(clasificadorService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ clasificador });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: clasificador }));
        saveSubject.complete();

        // THEN
        expect(clasificadorService.create).toHaveBeenCalledWith(clasificador);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Clasificador>>();
        const clasificador = { id: 123 };
        jest.spyOn(clasificadorService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ clasificador });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(clasificadorService.update).toHaveBeenCalledWith(clasificador);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackClasificadorById', () => {
        it('Should return tracked Clasificador primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackClasificadorById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackSeccionById', () => {
        it('Should return tracked Seccion primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackSeccionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
