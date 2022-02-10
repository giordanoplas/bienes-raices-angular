import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProDestacadasComponent } from './pro-destacadas.component';

describe('ProDestacadasComponent', () => {
  let component: ProDestacadasComponent;
  let fixture: ComponentFixture<ProDestacadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProDestacadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProDestacadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
