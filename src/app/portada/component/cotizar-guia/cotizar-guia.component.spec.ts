import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizarGuiaComponent } from './cotizar-guia.component';

describe('CotizarGuiaComponent', () => {
  let component: CotizarGuiaComponent;
  let fixture: ComponentFixture<CotizarGuiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizarGuiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizarGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
