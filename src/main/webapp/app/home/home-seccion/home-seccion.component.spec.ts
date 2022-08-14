import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSeccionComponent } from './home-seccion.component';

describe('HomeSeccionComponent', () => {
  let component: HomeSeccionComponent;
  let fixture: ComponentFixture<HomeSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSeccionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
