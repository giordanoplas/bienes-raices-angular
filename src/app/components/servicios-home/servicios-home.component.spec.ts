import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosHomeComponent } from './servicios-home.component';

describe('ServiciosHomeComponent', () => {
  let component: ServiciosHomeComponent;
  let fixture: ComponentFixture<ServiciosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
