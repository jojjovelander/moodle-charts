import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {PieChartData} from './pie-chart-data';
import {SeriesDataset} from './series-dataset';
import {GeneralInfo} from './general-info';
import { environment as Enviroment } from '../environments/environment';

interface UserIPData {
  ip: string;
  timecreated: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  userId: string;
  courseId: string;
  isLinkMode = false;
  authToken: string;

  private generalInfo: GeneralInfo;

  constructor(private httpClient: HttpClient) {
  }

  public getGeneralInfo(): Observable<GeneralInfo> {
    if (this.generalInfo == null){
      const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_general_info&t=${this.authToken}`;
      console.log(url);
      return this.httpClient.get(url).pipe(map(data => this.generalInfo = JSON.parse(data.toString()) as GeneralInfo));
    } else {
      return of(this.generalInfo);
    }
  }

  public getOriginData() {
    const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_origin_data&t=${this.authToken}`;
    console.log(url);
    return this.httpClient.get(url).pipe(map(data => JSON.parse(data.toString()) as PieChartData[]));
  }

  public getAssignmentsGrades() {
    const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_assignment_grades&t=${this.authToken}`;
    console.log(url);
    return this.httpClient.get(url);
  }

  public getPieChartData() {
    const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_user_events&t=${this.authToken}`;
    console.log(url);
    return this.httpClient.get(url).pipe(map(data => JSON.parse(data.toString()) as PieChartData[]));
  }

  public getUserEventOverTimeData() {
    const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_user_events_over_time&t=${this.authToken}`;
    console.log(url);
    return this.httpClient.get(url).pipe(map(data => JSON.parse(data.toString()) as SeriesDataset[]));
  }

  public getUserGradeItemsByCourse() {
    const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_user_grade_items_by_course&t=${this.authToken}`;
    console.log(url);
    return this.httpClient.get(url);
  }

  public getUserIPData(): Observable<UserIPData> {
    const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_ip_data&t=${this.authToken}`;
    console.log(url);
    return this.httpClient.get(url).pipe(
      map(data => JSON.parse(data.toString()) as UserIPData[]),
      mergeMap( data => from(data).pipe())
    );
  }
}
