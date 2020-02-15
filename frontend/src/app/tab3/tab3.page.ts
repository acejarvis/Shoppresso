import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {

  itemsList: any[];

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  // map-configuration
  map: google.maps.Map;
  lat = 40.730610;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };


  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  constructor(private searchService: SearchService) { }

  ngAfterViewInit() {

  }



  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);

  }

}
