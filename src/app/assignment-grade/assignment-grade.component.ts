import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

interface BarChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-assignment-grade',
  templateUrl: './assignment-grade.component.html',
  styleUrls: ['./assignment-grade.component.css']
})
export class AssignmentGradeComponent implements OnInit {

  assignments: BarChartData[][];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMockData().subscribe(
      data => {
        this.assignments = JSON.parse(data.toString()) as BarChartData[][];
        /*this.single = test[0] as BarChartData[];
        console.log(this.single);*/
      }
    );
  }

}
