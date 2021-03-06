import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ChartBase} from '../chart-base';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends ChartBase implements OnInit {

  multi: any[];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = '# of Events';
  timeline = true;

  colorScheme = 'flame';
  course: string;

  constructor(apiService: ApiService) {
    super(apiService);
  }

  ngOnInit(): void {
    super.getApiService().getUserEventOverTimeData().subscribe(
      data => {
        this.multi = data;
      }
    );
    super.getApiService().getGeneralInfo().subscribe( data => this.course = data.course);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
