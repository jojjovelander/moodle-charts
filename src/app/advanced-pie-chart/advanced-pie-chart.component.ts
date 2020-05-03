import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {TreemapData} from '../treemap-data';


@Component({
  selector: 'app-advanced-pie-chart',
  templateUrl: './advanced-pie-chart.component.html',
  styleUrls: ['./advanced-pie-chart.component.css']
})
export class AdvancedPieChartComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  single: TreemapData[];
  view: any[] = [700, 400];

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;

  colorScheme = 'flame';

  ngOnInit(): void {
    this.apiService.getBubbleData().subscribe(
      data => {
        this.single = JSON.parse(data.toString()) as TreemapData[];
        console.log(this.single);
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

