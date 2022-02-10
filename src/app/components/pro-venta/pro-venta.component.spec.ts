import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProVentaComponent } from './pro-venta.component';

describe('ProVentaComponent', () => {
  let component: ProVentaComponent;
  let fixture: ComponentFixture<ProVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
