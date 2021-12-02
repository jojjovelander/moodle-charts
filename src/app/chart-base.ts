import {HostListener, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ComponentState} from "./component-state";

@Injectable()
export class ChartBase {

  componentState = ComponentState;
  currentComponentState: ComponentState = ComponentState.Loading

  constructor(private apiService: ApiService) {
  }

  getApiService() {
    return this.apiService;
  }

  @HostListener('click') onMouseEnter() {
    if (this.apiService.isLinkMode) {
      window.open('/report/analytics_dashboard/index.php?id=' + this.apiService.courseId, '_blank');
    }
  }
}
