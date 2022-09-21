import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaborationGuideComponent } from './elaboration-guide.component';

describe('ElaborationGuideComponent', () => {
  let component: ElaborationGuideComponent;
  let fixture: ComponentFixture<ElaborationGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElaborationGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElaborationGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
