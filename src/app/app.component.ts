import {Component, ElementRef, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  courseId: any;

  constructor(el: ElementRef, private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    apiService.userId = el.nativeElement.getAttribute('userId');
    this.courseId = el.nativeElement.getAttribute('courseId');
    const start = el.nativeElement.getAttribute('start');
    if (start != null) {
      this.router.navigate([start], {queryParams: {id: this.courseId}, skipLocationChange: true}).then((e) => {
        if (e) {
          console.log('Navigation is successful!');
        } else {
          console.log('Navigation has failed!');
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.courseId == null) {
      this.route.queryParams.subscribe(params => {
        this.apiService.courseId = params.id;
      });
    } else {
      this.apiService.courseId = this.courseId;
      this.apiService.isLinkMode = true;
    }
  }
}
