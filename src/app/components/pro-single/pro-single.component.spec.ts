import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProSingleComponent } from './pro-single.component';

describe('ProSingleComponent', () => {
  let component: ProSingleComponent;
  let fixture: ComponentFixture<ProSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
