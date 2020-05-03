import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {PieChartData} from '../pie-chart-data';


@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css']
})
export class TreemapComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  single: PieChartData[] = [{name: 'No events', value: 0}];

  // options
  gradient = false;
  animations = true;
  colorScheme = 'flame';

  ngOnInit(): void {
    this.apiService.getPieChartData().subscribe(
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
