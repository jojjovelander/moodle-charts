import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

interface BarChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-assignments-grades',
  templateUrl: './assignments-grades.component.html',
  styleUrls: ['./assignments-grades.component.css']
})
export class AssignmentsGradesComponent implements OnInit {

  assignments: BarChartData[][];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getAssignmentsGrades().subscribe(
      data => {
        this.assignments = JSON.parse(data.toString()) as BarChartData[][];
      }
    );
  }

}
