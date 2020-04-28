import {Component, ElementRef, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(el: ElementRef, private route: ActivatedRoute, private apiService: ApiService) {
    apiService.userId = el.nativeElement.getAttribute('userId');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);
    });
  }
}
