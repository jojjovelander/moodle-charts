import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

interface TreemapData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css']
})
export class TreemapComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  single: TreemapData[] = [{name: 'No events', value: 0}];
  view: any[] = [700, 400];

  // options
  gradient = false;
  animations = true;

  colorScheme = 'flame';

  ngOnInit(): void {
    this.apiService.getBubbleData().subscribe(
      data => {
        this.single = JSON.parse(data.toString()) as TreemapData[];
        console.log(this.single);
      }
    );
  }

  onSelect(event) {
    console.log(event);
  }

  labelFormatting(c) {
    return `${(c.label)} Population`;
  }

}
