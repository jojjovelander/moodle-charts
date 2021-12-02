import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ChartBase} from '../chart-base';
import {ComponentState} from "../component-state";
import {SeriesDataset} from "../series-dataset";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends ChartBase implements OnInit {

  dataset: SeriesDataset[];

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
    super.getApiService().getUserEventOverTimeData().subscribe(data => this.dataset = data);
    super.getApiService().generalInfo.subscribe(data => this.course = data.course);
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
