import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestacadasHomeComponent } from './destacadas-home.component';

describe('DestacadasHomeComponent', () => {
  let component: DestacadasHomeComponent;
  let fixture: ComponentFixture<DestacadasHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestacadasHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestacadasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
