import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarPasswordComponent } from './validar-password.component';

describe('ValidarPasswordComponent', () => {
  let component: ValidarPasswordComponent;
  let fixture: ComponentFixture<ValidarPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidarPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
