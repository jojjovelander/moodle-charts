import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ChartBase} from '../chart-base';

interface BarChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent extends ChartBase implements OnInit {

  constructor(apiService: ApiService) {
    super(apiService);
  }

  single: any[];
  multi: any[];


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  legendPosition = 'below';
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Assignment';
  showYAxisLabel = true;
  yAxisLabel = 'Grade';
  noBarWhenZero = false;

  colorScheme = 'flame';

  @Input() chartData;
  @Input() assigmentNumber;

  ngOnInit(): void {
    this.single = this.chartData;
    this.xAxisLabel = 'Assignment #' + this.assigmentNumber;
  }

  barCustomColors() {
    const result: any[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.single.length; i++) {
      if (this.single[i].selected) {
        result.push({name: this.single[i].name, value: '#0000ff'});
      }else {
        result.push({name: this.single[i].name, value: '#00ff00'});
      }
    }
    return result;
  }

  onSelect(event) {
    console.log(event);
  }
}
