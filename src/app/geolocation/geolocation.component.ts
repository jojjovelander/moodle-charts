import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {GeolocationService} from '../geolocation.service';
import {mergeMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CustomMarkerData} from '../custom-marker-data';
import {ChartBase} from '../chart-base';


@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent extends ChartBase implements OnInit, AfterViewInit {

  constructor(apiService: ApiService, private geolocationService: GeolocationService) {
    super(apiService);
  }
  course: string;

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  // Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(56.8524919, 14.8234066);  // Default to LNU

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 9
  };

  latest = 0;

  ngOnInit(): void {
    super.getApiService().getGeneralInfo().subscribe( data => this.course = data.course);
  }

  private isLatestTimestamp(timecreated: number): boolean {
    /*console.log(`timecreated=${timecreated}, latest=${this.latest}, isLatest=${timecreated > this.latest}`);*/
    if (timecreated > this.latest) {
      this.latest = timecreated;
      return true;
    }
    return false;
  }

  private loadMarkers() {
    super.getApiService().getUserIPData().pipe(
      /*tap(console.log),*/
      mergeMap(x => this.getData(x)))
      .subscribe(results => {
        /*console.log(results);*/

        if (results.coords.latitude == null || results.coords.longitude == null) {
          return;
        }

        const markerData = {
          position: new google.maps.LatLng(results.coords.latitude, results.coords.longitude),
          map: this.map,
          title: `Times accessed: <strong>${results.ipData.count}</strong><p>Last accessed: <strong>${new Date(results.ipData.timecreated * 1000).toLocaleDateString('en-US')}</strong></p>`,
        };

        const marker = new google.maps.Marker({
          ...markerData
        });

        // creating a new info window with markers info
        const infoWindow = new google.maps.InfoWindow({
          content: marker.getTitle()
        });

        // Add click event to open info window on marker
        marker.addListener('click', () => {
          infoWindow.open(marker.getMap(), marker);
        });

        // Adding marker to google map
        marker.setMap(this.map);

        // Center the map on the latest location
        const latest = this.isLatestTimestamp(results.ipData.timecreated);
        if (latest) {
          this.map.setCenter(new google.maps.LatLng(markerData.position.lat(), markerData.position.lng()));
        }
      });
  }

  private getData(param): Observable<CustomMarkerData> {
    return this.geolocationService.getLocationData(param);
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  private mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    // Adding other markers
    this.loadMarkers();
  }
}
