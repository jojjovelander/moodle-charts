import {HostListener} from '@angular/core';
import {ApiService} from './api.service';


export class ChartBase {

  constructor(private apiService: ApiService) {}

  getApiService()  {
    return this.apiService;
  }

  @HostListener('click') onMouseEnter() {
    if (this.apiService.isLinkMode) {
      window.open('/report/graphic/index.php?id=2', '_blank');
    }
  }
}
