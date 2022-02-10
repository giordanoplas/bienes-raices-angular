import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentesHomeComponent } from './agentes-home.component';

describe('AgentesHomeComponent', () => {
  let component: AgentesHomeComponent;
  let fixture: ComponentFixture<AgentesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
