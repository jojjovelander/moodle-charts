import {Component, OnInit} from '@angular/core';
import {ChartBase} from '../chart-base';
import {ApiService} from '../api.service';
import {ComponentState} from "../component-state";
import {PieChartData} from "../pie-chart-data";

@Component({
  selector: 'app-origin-pie-chart',
  templateUrl: './origin-pie-chart.component.html',
  styleUrls: ['./origin-pie-chart.component.css']
})
export class OriginPieChartComponent extends ChartBase implements OnInit {

  dataset: PieChartData[];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = true;
  legendPosition = 'right';

  colorScheme = 'vivid';
  course: string;

  constructor(apiService: ApiService) {
    super(apiService);
  }

  ngOnInit(): void {
    super.getApiService().getOriginData().subscribe(
      data => {
        this.dataset = data;
        if (this.dataset.length === 0) {
          this.currentComponentState = ComponentState.NoData;
        } else {
          this.currentComponentState = ComponentState.Loaded
        }
      },
      error => this.currentComponentState = ComponentState.Error
    )
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
