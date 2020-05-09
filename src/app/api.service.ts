import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {PieChartData} from './pie-chart-data';
import {SeriesDataset} from './series-dataset';

interface UserIPData {
  ip: string;
  timecreated: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  TOKEN = 'c5f7150439c23ef073b1ae67724a9762';
  HOST = 'http://localhost:8000/webservice/rest/server.php?wstoken=';

  userId: string;
  courseId: string;
  isLinkMode = false;

  constructor(private httpClient: HttpClient) {
  }

  public getAssignmentsGrades() {
    const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_assignment_grades&courseid=${(this.courseId)}&userid=${this.userId}`;
    console.log(url);
    return this.httpClient.get(url);
  }

  public getPieChartData() {
    const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_user_events&courseid=${(this.courseId)}&userid=${this.userId}`;
    console.log(url);
    return this.httpClient.get(url).pipe(map(data => JSON.parse(data.toString()) as PieChartData[]));
  }

  public getUserEventOverTimeData() {
    const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_user_events_over_time&courseid=${(this.courseId)}&userid=${this.userId}`;
    console.log(url);
    return this.httpClient.get(url).pipe(map(data => JSON.parse(data.toString()) as SeriesDataset[]));
  }

  public getUserGradeItemsByCourse() {
    const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_user_grade_items_by_course&courseid=${(this.courseId)}&userid=${this.userId}`;
    console.log(url);
    return this.httpClient.get(url);
  }

  public getUserIPData(): Observable<UserIPData> {
    const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_course_statistics_webservice_get_ip_data&courseid=${(this.courseId)}&userid=${this.userId}`;
    console.log(url);
    return this.httpClient.get(url).pipe(
      map(data => JSON.parse(data.toString()) as UserIPData[]),
      mergeMap( data => from(data).pipe())
    );
  }
}
