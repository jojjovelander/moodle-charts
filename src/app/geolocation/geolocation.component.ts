import {Component, OnInit, ViewChild} from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import {ApiService} from '../api.service';
import {GeolocationService} from '../geolocation.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {forkJoin, from, Observable} from 'rxjs';
import {conditionallyCreateMapObjectLiteral} from '@angular/compiler/src/render3/view/util';

interface UserIPData {
  ip: string;
  timecreated: number;
  count: number;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface OurMapMarkers {
  position: google.maps.LatLngLiteral;
  label: string;
}

interface SomeRandomObject {
  coords: Coordinates;
  ipData: UserIPData;
}

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {

  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  center = {lat: 24, lng: 12};
  markerOptions = {draggable: false};
  markers: OurMapMarkers[] = [];
  zoom = 4;
  display?: google.maps.LatLngLiteral;
  private userIPData: UserIPData[];
  currentCount: google.maps.MarkerLabel;

  constructor(private apiService: ApiService, private geolocationService: GeolocationService) {
  }

  private getData(param): Observable<SomeRandomObject> {
    console.log(param);
    return this.geolocationService.getLocationData(param);
  }

  ngOnInit(): void {
    this.apiService.getUserIPData().pipe(
      tap(console.log),
      mergeMap(x => this.getData(x)))
      .subscribe(results => {
        console.log(results);
        // tslint:disable-next-line:max-line-length
        const test = {position: new google.maps.LatLng(results.coords.latitude, results.coords.longitude, false).toJSON(), label: results.ipData.count.toString()} as OurMapMarkers;
        this.markers.push(test);
      /*const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);*/
    });

    /*this.apiService.getUserIPData()
      .pipe(
        tap(console.log),
        mergeMap(ipDataArray => from(ipDataArray).pipe(map(ipData => this.getData(ipData)))),
        mergeMap(result => result)
      ).subscribe(
      data => {
        const test = new google.maps.LatLng(data.latitude, data.longitude, false).toJSON();
        this.markerPositions.push(test);

        this.infoWindow.options = {content: `Here we are`};
        console.log(data);
      });*/
  }

  private addMarker(event: google.maps.MouseEvent) {
    this.markers.push({position: event.latLng.toJSON(), label: 'ANOTHER TESTSE'} as OurMapMarkers);
  }

  private move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  private openInfoWindow(marker: MapMarker) {
    console.log(marker);
    this.currentCount = marker.getLabel();
    this.infoWindow.open(marker);
  }

  private removeLastMarker() {
    this.markers.pop();
  }

}
