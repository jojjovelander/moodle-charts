import { Component, OnInit } from '@angular/core';
import {ChartBase} from '../chart-base';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-origin-pie-chart',
  templateUrl: './origin-pie-chart.component.html',
  styleUrls: ['./origin-pie-chart.component.css']
})
export class OriginPieChartComponent extends ChartBase implements OnInit {

  single: any[];

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
    super.getApiService().getOriginData().subscribe(data => this.single = data);
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
