import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface UserIPData {
  ip: string;
  timecreated: number;
  count: number;
}
interface Coordinates {
  latitude: number;
  longitude: number;
  hits: number;
}

interface SomeRandomObject {
  coords: Coordinates;
  ipData: UserIPData;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  TOKEN = '?access_key=d158dd9349f6a9e13c46c510acdd26fd';
  HOST = 'http://api.ipstack.com/';

  constructor(private httpClient: HttpClient) {
  }

  private static buildResponse(coords: Coordinates, ipData: UserIPData): SomeRandomObject {
    return {coords, ipData};
  }

  public getLocationData(userIPData: UserIPData)/*: Observable<Coordinates>*/ {
    console.log(userIPData);
    const test = userIPData as UserIPData;
    const url = `${this.HOST}${test.ip}${this.TOKEN}`;
    return this.httpClient.get(url)
      .pipe(
        map(result => GeolocationService.buildResponse(result as Coordinates, userIPData)),
      );
  }
}
