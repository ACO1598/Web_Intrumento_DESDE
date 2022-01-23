jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { IdentificadorService } from '../service/identificador.service';
import { IIdentificador, Identificador } from '../identificador.model';
import { IClasificador } from 'app/entities/clasificador/clasificador.model';
import { ClasificadorService } from 'app/entities/clasificador/service/clasificador.service';

import { IdentificadorUpdateComponent } from './identificador-update.component';

describe('Identificador Management Update Component', () => {
  let comp: IdentificadorUpdateComponent;
  let fixture: ComponentFixture<IdentificadorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let identificadorService: IdentificadorService;
  let clasificadorService: ClasificadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [IdentificadorUpdateComponent],
      providers: [FormBuilder, ActivatedRoute],
    })
      .overrideTemplate(IdentificadorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IdentificadorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    identificadorService = TestBed.inject(IdentificadorService);
    clasificadorService = TestBed.inject(ClasificadorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Identificador query and add missing value', () => {
      const identificador: IIdentificador = { id: 456 };
      const hijoI: IIdentificador = { id: 31755 };
      identificador.hijoI = hijoI;

      const identificadorCollection: IIdentificador[] = [{ id: 12424 }];
      jest.spyOn(identificadorService, 'query').mockReturnValue(of(new HttpResponse({ body: identificadorCollection })));
      const additionalIdentificadors = [hijoI];
      const expectedCollection: IIdentificador[] = [...additionalIdentificadors, ...identificadorCollection];
      jest.spyOn(identificadorService, 'addIdentificadorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ identificador });
      comp.ngOnInit();

      expect(identificadorService.query).toHaveBeenCalled();
      expect(identificadorService.addIdentificadorToCollectionIfMissing).toHaveBeenCalledWith(
        identificadorCollection,
        ...additionalIdentificadors
      );
      expect(comp.identificadorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Clasificador query and add missing value', () => {
      const identificador: IIdentificador = { id: 456 };
      const clasificador: IClasificador = { id: 74583 };
      identificador.clasificador = clasificador;

      const clasificadorCollection: IClasificador[] = [{ id: 23370 }];
      jest.spyOn(clasificadorService, 'query').mockReturnValue(of(new HttpResponse({ body: clasificadorCollection })));
      const additionalClasificadors = [clasificador];
      const expectedCollection: IClasificador[] = [...additionalClasificadors, ...clasificadorCollection];
      jest.spyOn(clasificadorService, 'addClasificadorToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ identificador });
      comp.ngOnInit();

      expect(clasificadorService.query).toHaveBeenCalled();
      expect(clasificadorService.addClasificadorToCollectionIfMissing).toHaveBeenCalledWith(
        clasificadorCollection,
        ...additionalClasificadors
      );
      expect(comp.clasificadorsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const identificador: IIdentificador = { id: 456 };
      const hijoI: IIdentificador = { id: 63216 };
      identificador.hijoI = hijoI;
      const clasificador: IClasificador = { id: 15023 };
      identificador.clasificador = clasificador;

      activatedRoute.data = of({ identificador });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(identificador));
      expect(comp.identificadorsSharedCollection).toContain(hijoI);
      expect(comp.clasificadorsSharedCollection).toContain(clasificador);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Identificador>>();
      const identificador = { id: 123 };
      jest.spyOn(identificadorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ identificador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: identificador }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(identificadorService.update).toHaveBeenCalledWith(identificador);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Identificador>>();
      const identificador = new Identificador();
      jest.spyOn(identificadorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ identificador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: identificador }));
      saveSubject.complete();

      // THEN
      expect(identificadorService.create).toHaveBeenCalledWith(identificador);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Identificador>>();
      const identificador = { id: 123 };
      jest.spyOn(identificadorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ identificador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(identificadorService.update).toHaveBeenCalledWith(identificador);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackIdentificadorById', () => {
      it('Should return tracked Identificador primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackIdentificadorById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackClasificadorById', () => {
      it('Should return tracked Clasificador primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackClasificadorById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
