import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionComponent } from './publicacion.component';

describe('PublicacionComponent', () => {
  let component: PublicacionComponent;
  let fixture: ComponentFixture<PublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
