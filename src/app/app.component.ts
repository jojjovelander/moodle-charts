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
  private readonly token: string;
  start: string;

  constructor(el: ElementRef, private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    apiService.userId = el.nativeElement.getAttribute('userId');
    this.courseId = el.nativeElement.getAttribute('courseId');
    this.token = el.nativeElement.getAttribute('token');
    this.start = el.nativeElement.getAttribute('start');
    if (this.start != null) {
      this.router.navigate([this.start], {queryParams: {id: this.courseId}, skipLocationChange: true}).then((e) => {
        if (e) {
          console.log('Navigation is successful!');
        } else {
          console.log('Navigation has failed!');
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.token != null) {
      this.apiService.init(this.token);
    }
    if (this.start == null) {
      this.route.queryParams.subscribe(params => {
        this.apiService.courseId = params.id;
      });
    } else {
      this.apiService.courseId = this.courseId;
      this.apiService.isLinkMode = true;
    }
  }
}
