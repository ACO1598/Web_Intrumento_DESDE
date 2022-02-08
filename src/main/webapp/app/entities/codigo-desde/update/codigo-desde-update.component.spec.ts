jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CodigoDESDEService } from '../service/codigo-desde.service';
import { ICodigoDESDE, CodigoDESDE } from '../codigo-desde.model';

import { CodigoDESDEUpdateComponent } from './codigo-desde-update.component';

describe('Component Tests', () => {
  describe('CodigoDESDE Management Update Component', () => {
    let comp: CodigoDESDEUpdateComponent;
    let fixture: ComponentFixture<CodigoDESDEUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let codigoDESDEService: CodigoDESDEService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CodigoDESDEUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CodigoDESDEUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CodigoDESDEUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      codigoDESDEService = TestBed.inject(CodigoDESDEService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const codigoDESDE: ICodigoDESDE = { id: 456 };

        activatedRoute.data = of({ codigoDESDE });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(codigoDESDE));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CodigoDESDE>>();
        const codigoDESDE = { id: 123 };
        jest.spyOn(codigoDESDEService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ codigoDESDE });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: codigoDESDE }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(codigoDESDEService.update).toHaveBeenCalledWith(codigoDESDE);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CodigoDESDE>>();
        const codigoDESDE = new CodigoDESDE();
        jest.spyOn(codigoDESDEService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ codigoDESDE });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: codigoDESDE }));
        saveSubject.complete();

        // THEN
        expect(codigoDESDEService.create).toHaveBeenCalledWith(codigoDESDE);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CodigoDESDE>>();
        const codigoDESDE = { id: 123 };
        jest.spyOn(codigoDESDEService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ codigoDESDE });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(codigoDESDEService.update).toHaveBeenCalledWith(codigoDESDE);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
