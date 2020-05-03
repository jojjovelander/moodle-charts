import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsGradesComponent } from './assignments-grades.component';

describe('AssignmentGradeComponent', () => {
  let component: AssignmentsGradesComponent;
  let fixture: ComponentFixture<AssignmentsGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
