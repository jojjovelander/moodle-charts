import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UserIPData} from './user-ipdata';
import {Coordinates} from './coordinates';
import {Observable} from 'rxjs';


interface CustomMarkerData {
  coords: Coordinates;
  ipData: UserIPData;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  TOKEN = '?access_key=d158dd9349f6a9e13c46c510acdd26fd';
  HOST = 'https://api.ipstack.com/';

  constructor(private httpClient: HttpClient) {
  }

  private static buildResponse(coords: Coordinates, ipData: UserIPData): CustomMarkerData {
    return {coords, ipData};
  }

  public getLocationData(userIPData: UserIPData): Observable<CustomMarkerData> {
    console.log(userIPData);
    const test = userIPData as UserIPData;
    const url = `${this.HOST}${test.ip}${this.TOKEN}`;
    return this.httpClient.get(url)
      .pipe(
        map(result => GeolocationService.buildResponse(result as Coordinates, userIPData)),
      );
  }
}
