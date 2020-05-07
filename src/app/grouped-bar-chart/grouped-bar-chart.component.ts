import {Component, HostListener, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ApiService} from '../api.service';
import {ChartBase} from '../chart-base';

interface GroupedBarChartData {
  name: string;
  series: SeriesData[];
}

interface SeriesData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.css']
})

export class GroupedBarChartComponent extends ChartBase implements OnInit {

  multi: GroupedBarChartData[];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Assignments';
  showYAxisLabel = true;
  yAxisLabel = 'Grade';
  legendTitle = 'Years';
  noBarWhenZero = false;

  colorScheme = 'flame';

  ngOnInit(): void {
    super.getApiService().getUserGradeItemsByCourse().subscribe(
      data => {
        this.multi = JSON.parse(data.toString()) as GroupedBarChartData[];
        console.log(this.multi);
      }
    );
  }

  constructor(apiService: ApiService) {
    super(apiService);
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
