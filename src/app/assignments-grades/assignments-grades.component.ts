import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ChartBase} from '../chart-base';
import {ComponentState} from "../component-state";
import {zip} from "rxjs";
import {map} from "rxjs/operators";

interface BarChartData {
  name: string;
  value: number;
}

export interface AssignmentData {
  user_grade: string;
  assignment_name: string;
  grades: BarChartData[];
}

@Component({
  selector: 'app-assignments-grades',
  templateUrl: './assignments-grades.component.html',
  styleUrls: ['./assignments-grades.component.css']
})
export class AssignmentsGradesComponent extends ChartBase implements OnInit {

  assignments: AssignmentData[];

  constructor(apiService: ApiService) {
    super(apiService);
  }

  course: string;

  colorScheme = {
    domain: ['#cccccc']
  };

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  legendPosition = 'below';
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = '# of students';
  noBarWhenZero = false;

  onSelect(event) {
    console.log(event);
  }

  formatXAxis(assignmentName: string) {
    if (assignmentName != null && assignmentName.length !== 0) {
      return 'Grades for ' + assignmentName;
    }
    return 'Grades';
  }

  ngOnInit(): void {

    zip(
      super.getApiService().getAssignmentsGrades(),
      super.getApiService().generalInfo
    ).pipe(map(([assignmentData, generalInfo]) => (
      {
        assignmentData: assignmentData,
        course: generalInfo.course,
      }
    ))).subscribe(result => {
        if (result.assignmentData.length === 0) {
          this.currentComponentState = ComponentState.NoData
        } else {
          this.currentComponentState = ComponentState.Loaded
        }
        this.assignments = result.assignmentData;
        this.course = result.course;
      },
      error => this.currentComponentState = ComponentState.Error,
    );
  }
}
