import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { IdentificadorService } from '../service/identificador.service';

import { IdentificadorComponent } from './identificador.component';

describe('Identificador Management Component', () => {
  let comp: IdentificadorComponent;
  let fixture: ComponentFixture<IdentificadorComponent>;
  let service: IdentificadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [IdentificadorComponent],
    })
      .overrideTemplate(IdentificadorComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IdentificadorComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(IdentificadorService);

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
    expect(comp.identificadors?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
