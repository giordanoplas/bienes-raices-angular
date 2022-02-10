import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProAlquilerComponent } from './pro-alquiler.component';

describe('ProAlquilerComponent', () => {
  let component: ProAlquilerComponent;
  let fixture: ComponentFixture<ProAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProAlquilerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
