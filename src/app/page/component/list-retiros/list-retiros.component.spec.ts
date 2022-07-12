import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRetirosComponent } from './list-retiros.component';

describe('ListRetirosComponent', () => {
  let component: ListRetirosComponent;
  let fixture: ComponentFixture<ListRetirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRetirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRetirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
