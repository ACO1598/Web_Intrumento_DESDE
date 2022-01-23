import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CodigoDESDEDetailComponent } from './codigo-desde-detail.component';

describe('CodigoDESDE Management Detail Component', () => {
  let comp: CodigoDESDEDetailComponent;
  let fixture: ComponentFixture<CodigoDESDEDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodigoDESDEDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ codigoDESDE: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CodigoDESDEDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CodigoDESDEDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load codigoDESDE on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.codigoDESDE).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
