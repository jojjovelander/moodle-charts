import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ChartBase} from '../chart-base';

interface BarChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-assignments-grades',
  templateUrl: './assignments-grades.component.html',
  styleUrls: ['./assignments-grades.component.css']
})
export class AssignmentsGradesComponent extends ChartBase implements OnInit {

  assignments: BarChartData[][];

  constructor(apiService: ApiService) {
    super(apiService);
  }
  course: string;
  ngOnInit(): void {
    super.getApiService().getAssignmentsGrades().subscribe(
      data => {
        this.assignments = JSON.parse(data.toString()) as BarChartData[][];
      }
    );
    super.getApiService().getGeneralInfo().subscribe( data => this.course = data.course);
  }

}
