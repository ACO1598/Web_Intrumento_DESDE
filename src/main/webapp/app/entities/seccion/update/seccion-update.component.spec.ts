jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SeccionService } from '../service/seccion.service';
import { ISeccion, Seccion } from '../seccion.model';
import { ICodigoDESDE } from 'app/entities/codigo-desde/codigo-desde.model';
import { CodigoDESDEService } from 'app/entities/codigo-desde/service/codigo-desde.service';

import { SeccionUpdateComponent } from './seccion-update.component';

describe('Component Tests', () => {
  describe('Seccion Management Update Component', () => {
    let comp: SeccionUpdateComponent;
    let fixture: ComponentFixture<SeccionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let seccionService: SeccionService;
    let codigoDESDEService: CodigoDESDEService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SeccionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SeccionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SeccionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      seccionService = TestBed.inject(SeccionService);
      codigoDESDEService = TestBed.inject(CodigoDESDEService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call CodigoDESDE query and add missing value', () => {
        const seccion: ISeccion = { id: 456 };
        const codigoDESDE: ICodigoDESDE = { id: 91098 };
        seccion.codigoDESDE = codigoDESDE;

        const codigoDESDECollection: ICodigoDESDE[] = [{ id: 37881 }];
        jest.spyOn(codigoDESDEService, 'query').mockReturnValue(of(new HttpResponse({ body: codigoDESDECollection })));
        const additionalCodigoDESDES = [codigoDESDE];
        const expectedCollection: ICodigoDESDE[] = [...additionalCodigoDESDES, ...codigoDESDECollection];
        jest.spyOn(codigoDESDEService, 'addCodigoDESDEToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ seccion });
        comp.ngOnInit();

        expect(codigoDESDEService.query).toHaveBeenCalled();
        expect(codigoDESDEService.addCodigoDESDEToCollectionIfMissing).toHaveBeenCalledWith(
          codigoDESDECollection,
          ...additionalCodigoDESDES
        );
        expect(comp.codigoDESDESSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const seccion: ISeccion = { id: 456 };
        const codigoDESDE: ICodigoDESDE = { id: 27638 };
        seccion.codigoDESDE = codigoDESDE;

        activatedRoute.data = of({ seccion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(seccion));
        expect(comp.codigoDESDESSharedCollection).toContain(codigoDESDE);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Seccion>>();
        const seccion = { id: 123 };
        jest.spyOn(seccionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ seccion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: seccion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(seccionService.update).toHaveBeenCalledWith(seccion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Seccion>>();
        const seccion = new Seccion();
        jest.spyOn(seccionService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ seccion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: seccion }));
        saveSubject.complete();

        // THEN
        expect(seccionService.create).toHaveBeenCalledWith(seccion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Seccion>>();
        const seccion = { id: 123 };
        jest.spyOn(seccionService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ seccion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(seccionService.update).toHaveBeenCalledWith(seccion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCodigoDESDEById', () => {
        it('Should return tracked CodigoDESDE primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackCodigoDESDEById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
