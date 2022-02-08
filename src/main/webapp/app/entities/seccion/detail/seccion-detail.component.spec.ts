import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SeccionDetailComponent } from './seccion-detail.component';

describe('Component Tests', () => {
  describe('Seccion Management Detail Component', () => {
    let comp: SeccionDetailComponent;
    let fixture: ComponentFixture<SeccionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SeccionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ seccion: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(SeccionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeccionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load seccion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.seccion).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
