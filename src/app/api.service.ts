import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, iif, Observable, of, ReplaySubject} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PieChartData} from './pie-chart-data';
import {SeriesDataset} from './series-dataset';
import {GeneralInfo} from './general-info';
import {environment as Enviroment} from '../environments/environment';
import {AssignmentData} from "./assignments-grades/assignments-grades.component";

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
  unknownCourse = <GeneralInfo>{course: "unknown course"};

  constructor(private httpClient: HttpClient) { }

  public init(token: string) {
    this.authToken = token;
    //this._generalInfo.next(<GeneralInfo>{course: "loading."})
    this.getGeneralInfo().subscribe(info => this._generalInfo.next(info));
  }

  private _generalInfo = new ReplaySubject<GeneralInfo>();

  get generalInfo(): Observable<GeneralInfo> {
    return this._generalInfo.asObservable();
  }

  private getGeneralInfo(): Observable<GeneralInfo> {
    const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_general_info&t=${this.authToken}`;
    console.log(url);

    return this.httpClient.get(url).pipe(
      map(responseData => JSON.parse(responseData.toString()) as GeneralInfo),
      mergeMap(generalInfo => iif(() => (generalInfo as GeneralInfo).course.length > 0, of(generalInfo), of(this.unknownCourse))),
      catchError(val => of(this.unknownCourse))
    );
  }

  public getOriginData() {
    const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_origin_data&t=${this.authToken}`;
    console.log(url);
    return this.httpClient.get(url).pipe(map(data => JSON.parse(data.toString()) as PieChartData[]));
  }

  public getAssignmentsGrades() {
    const url = `${Enviroment.HOST}${Enviroment.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_assignment_grades&t=${this.authToken}`;
    console.log(url);
    return this.httpClient.get(url).pipe(map(data => JSON.parse(data.toString()) as AssignmentData[]));
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
      mergeMap(data => from(data).pipe())
    );
  }
}
