import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferidosComponent } from './referidos.component';

describe('ReferidosComponent', () => {
  let component: ReferidosComponent;
  let fixture: ComponentFixture<ReferidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
