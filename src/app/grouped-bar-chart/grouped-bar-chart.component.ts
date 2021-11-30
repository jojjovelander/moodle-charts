import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ChartBase} from '../chart-base';
import {SeriesDataset} from '../series-dataset';


@Component({
  selector: 'app-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.css']
})

export class GroupedBarChartComponent extends ChartBase implements OnInit {

  multi: SeriesDataset[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Assignments';
  showYAxisLabel = true;
  yAxisLabel = 'Grade';
  legendTitle = 'Grade Type';
  noBarWhenZero = false;

  colorScheme = 'flame';
  course: string;

  ngOnInit(): void {
    super.getApiService().getUserGradeItemsByCourse().subscribe(
      data => {
        this.multi = JSON.parse(data.toString()) as SeriesDataset[];
        console.log(this.multi);
      }
    );
    super.getApiService().generalInfo.subscribe( data => this.course = data.course);
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
