import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormpublicacionComponent } from './formpublicacion.component';

describe('PublicacionComponent', () => {
  let component: FormpublicacionComponent;
  let fixture: ComponentFixture<FormpublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormpublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
