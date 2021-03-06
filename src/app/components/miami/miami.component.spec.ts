import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiamiComponent } from './miami.component';

describe('MiamiComponent', () => {
  let component: MiamiComponent;
  let fixture: ComponentFixture<MiamiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiamiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiamiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
