import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormbancosComponent } from './formbancos.component';

describe('FormbancosComponent', () => {
  let component: FormbancosComponent;
  let fixture: ComponentFixture<FormbancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormbancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormbancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
