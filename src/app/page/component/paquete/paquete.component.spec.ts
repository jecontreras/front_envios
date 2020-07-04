import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteComponent } from './paquete.component';

describe('PaqueteComponent', () => {
  let component: PaqueteComponent;
  let fixture: ComponentFixture<PaqueteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaqueteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
