import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {AppComponent} from './app.component';
import {GroupedBarChartComponent} from './grouped-bar-chart/grouped-bar-chart.component';
import {RouterModule, Routes} from '@angular/router';
import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {path: 'grouped-bar-chart', component: GroupedBarChartComponent},
  {path: '**', component: DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GroupedBarChartComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
