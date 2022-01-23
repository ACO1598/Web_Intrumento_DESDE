import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IdentificadorDetailComponent } from './identificador-detail.component';

describe('Identificador Management Detail Component', () => {
  let comp: IdentificadorDetailComponent;
  let fixture: ComponentFixture<IdentificadorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdentificadorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ identificador: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(IdentificadorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(IdentificadorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load identificador on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.identificador).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
