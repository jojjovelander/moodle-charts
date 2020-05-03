import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {PieChartData} from './pie-chart-data';

interface UserIPData {
  ip: string;
  timecreated: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  TOKEN = 'd8b7fa8fe26b029698b4344971ffd3d3';
  HOST = 'http://localhost:8000/webservice/rest/server.php?wstoken=';

  userId: string;
  courseId: string;

  constructor(private httpClient: HttpClient) {
  }

  public getAssignmentsGrades() {
    const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_get_mock_data&courseid=${(this.courseId)}&userid=${this.userId}`;
    console.log(url);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get(url);
  }

  public getPieChartData() {
    const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_get_bubble_data&courseid=${(this.courseId)}&userid=${this.userId}`;
    console.log(url);
    return this.httpClient.get(url).pipe(map(data => JSON.parse(data.toString()) as PieChartData[]));
  }

  public getUserGradeItemsByCourse() {
    const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_get_user_grade_items_by_course&courseid=${(this.courseId)}&userid=${this.userId}`;
    console.log(url);
    return this.httpClient.get(url);
  }

  public getUserIPData(): Observable<UserIPData> {
    const url = `${this.HOST}${this.TOKEN}&moodlewsrestformat=json&wsfunction=local_wstemplate_get_ip_data&courseid=${(this.courseId)}&userid=${this.userId}`;
    console.log(url);
    return this.httpClient.get(url).pipe(
      map(data => JSON.parse(data.toString()) as UserIPData[]),
      mergeMap( data => from(data).pipe())
    );
  }
}
