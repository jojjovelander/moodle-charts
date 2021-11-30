import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {AppComponent} from './app.component';
import {GroupedBarChartComponent} from './grouped-bar-chart/grouped-bar-chart.component';
import {RouterModule, Routes} from '@angular/router';
import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TreemapComponent} from './treemap/treemap.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {AssignmentsGradesComponent} from './assignments-grades/assignments-grades.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {AdvancedPieChartComponent} from './advanced-pie-chart/advanced-pie-chart.component';
import {GeolocationComponent} from './geolocation/geolocation.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSliderModule} from '@angular/material/slider';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LineChartComponent} from './line-chart/line-chart.component';
import {OriginPieChartComponent} from './origin-pie-chart/origin-pie-chart.component';

const appRoutes: Routes = [
  {path: 'maps', component: GeolocationComponent},
  {path: 'line-chart', component: LineChartComponent},
  {path: 'assignments-grades', component: AssignmentsGradesComponent},
  {path: 'advanced-pie-chart', component: AdvancedPieChartComponent},
  {path: 'bar-chart', component: BarChartComponent},
  {path: 'grouped-bar-chart', component: GroupedBarChartComponent},
  {path: 'treemap', component: TreemapComponent},
  {path: '**', component: DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GroupedBarChartComponent,
    DashboardComponent,
    TreemapComponent,
    BarChartComponent,
    AssignmentsGradesComponent,
    AdvancedPieChartComponent,
    GeolocationComponent,
    LineChartComponent,
    OriginPieChartComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatCardModule,
    MatListModule,
    GoogleMapsModule,
    MatListModule,
    MatGridListModule,
    MatSliderModule,
    NgbModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
