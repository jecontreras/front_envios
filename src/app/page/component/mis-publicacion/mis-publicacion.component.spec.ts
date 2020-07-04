import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPublicacionComponent } from './mis-publicacion.component';

describe('MisPublicacionComponent', () => {
  let component: MisPublicacionComponent;
  let fixture: ComponentFixture<MisPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
