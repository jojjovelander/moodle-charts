import {Component, HostListener, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {PieChartData} from '../pie-chart-data';
import {ChartBase} from '../chart-base';


@Component({
  selector: 'app-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.css']
})
export class AdvancedPieChartComponent extends ChartBase implements OnInit {

  constructor(apiService: ApiService) {
    super(apiService);
  }

  single: PieChartData[];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;

  colorScheme = 'flame';

  ngOnInit(): void {
    super.getApiService().getPieChartData().subscribe(
      data => {
        this.single = data;
      }
    );
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
