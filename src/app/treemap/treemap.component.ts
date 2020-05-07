import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {PieChartData} from '../pie-chart-data';
import {ChartBase} from '../chart-base';


@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css']
})
export class TreemapComponent extends ChartBase implements OnInit {

  constructor(apiService: ApiService) {
    super(apiService);
  }

  single: PieChartData[] = [{name: 'No events', value: 0}];

  // options
  gradient = false;
  animations = true;
  colorScheme = 'flame';

  ngOnInit(): void {
    super.getApiService().getPieChartData().subscribe(
      data => { this.single = data; }
      );
  }

  onSelect(event) {
    console.log(event);
  }

  labelFormatting(c) {
    return `${(c.label)} Events`;
  }
}
