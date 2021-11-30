import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ChartBase} from '../chart-base';
import {ComponentState} from "../component-state";

interface BarChartData {
  name: string;
  value: number;
}

interface AssignmentData {
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
  componentState = ComponentState;
  currentComponentState:ComponentState = ComponentState.Loading

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
    super.getApiService().getAssignmentsGrades().subscribe(
      data => {
        this.currentComponentState = ComponentState.Loaded
        this.assignments = JSON.parse(data.toString()) as AssignmentData[];
        console.log(this.assignments);
        if (this.assignments.length === 0){
          this.currentComponentState = ComponentState.NoData;
        }
      },
      error => this.currentComponentState = ComponentState.Error
    );
    super.getApiService().generalInfo.subscribe(data => this.course = data.course);
  }
}
