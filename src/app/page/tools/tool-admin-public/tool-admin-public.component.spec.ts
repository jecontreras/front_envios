import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolAdminPublicComponent } from './tool-admin-public.component';

describe('ToolAdminPublicComponent', () => {
  let component: ToolAdminPublicComponent;
  let fixture: ComponentFixture<ToolAdminPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolAdminPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolAdminPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
