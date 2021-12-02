import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ChartBase} from '../chart-base';
import {SeriesDataset} from "../series-dataset";
import {map} from "rxjs/operators";
import {zip} from "rxjs";
import {ComponentState} from "../component-state";

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

    zip(
      super.getApiService().getUserEventOverTimeData(),
      super.getApiService().generalInfo
    ).pipe(map(([seriesData, generalInfo]) => (
      {
        seriesData: seriesData,
        course: generalInfo.course,
      }
    ))).subscribe(result => {
        if (result.seriesData.length === 0) {
          this.currentComponentState = ComponentState.NoData
        } else {
          this.currentComponentState = ComponentState.Loaded
        }
        this.dataset = result.seriesData;
        this.course = result.course;
      },
      error => this.currentComponentState = ComponentState.Error,
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
