import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ClasificadorService } from '../service/clasificador.service';

import { ClasificadorComponent } from './clasificador.component';

describe('Clasificador Management Component', () => {
  let comp: ClasificadorComponent;
  let fixture: ComponentFixture<ClasificadorComponent>;
  let service: ClasificadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ClasificadorComponent],
    })
      .overrideTemplate(ClasificadorComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClasificadorComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ClasificadorService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.clasificadors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
