import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRetirosComponent } from './form-retiros.component';

describe('FormRetirosComponent', () => {
  let component: FormRetirosComponent;
  let fixture: ComponentFixture<FormRetirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRetirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRetirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
