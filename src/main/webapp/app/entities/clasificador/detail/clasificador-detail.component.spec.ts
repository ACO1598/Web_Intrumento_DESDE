import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClasificadorDetailComponent } from './clasificador-detail.component';

describe('Component Tests', () => {
  describe('Clasificador Management Detail Component', () => {
    let comp: ClasificadorDetailComponent;
    let fixture: ComponentFixture<ClasificadorDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ClasificadorDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ clasificador: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ClasificadorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClasificadorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load clasificador on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.clasificador).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
