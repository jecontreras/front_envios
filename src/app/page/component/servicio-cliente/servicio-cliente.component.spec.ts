import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioClienteComponent } from './servicio-cliente.component';

describe('ServicioClienteComponent', () => {
  let component: ServicioClienteComponent;
  let fixture: ComponentFixture<ServicioClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
