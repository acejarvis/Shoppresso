import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { element } from 'protractor';
import { HttpclientService } from '../services/httpclient.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {



  @ViewChild('mapContainer', { static: false }) mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionForm: FormGroup;

  navigationLink: string;
  wayPointsLink = '';
  locations = [];
  constructor(private fb: FormBuilder, private searchService: SearchService, private router: Router, private http: HttpclientService) {
this.locations = this.searchService.locations;
console.log(this.searchService.locations);


  }

  // createDirectionForm() {
  //   this.directionForm = this.fb.group({
  //     source: ['Markham', Validators.required],
  //     destination: ['Toronto', Validators.required]
  //   });
  // }

  ngAfterViewInit(): void {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    this.directionsDisplay.setMap(map);
    if (this.searchService.isOK) {
      this.calculateAndDisplayRoute();
    }

  }

  JumptoNavigation() {
    console.log("hello moter fcker");
    this.router.navigateByUrl("https://www.google.com/maps/dir/?api=1&origin=[object+Object]&destination=[object+Object]&travelmode=driving&waypoints=1306+Kennedy+Rd,+Scarborough,+ON+M1P+2L5,+Canada%7C480+Progress+Ave,+Scarborough,+ON+M1P+5J1,+Canada%7C480+Progress+Ave,+Scarborough,+ON+M1P+5J1,+Canada%7C1306+Kennedy+Rd,+Scarborough,+ON+M1P+2L5,+Canada%7C480+Progress+Ave,+Scarborough,+ON+M1P+5J1,+Canada%7C4038+Hwy+7,+Markham,+ON+L3R+2L5,+Canada%7C480+Progress+Ave,+Scarborough,+ON+M1P+5J1,+Canada%7C1306+Kennedy+Rd,+Scarborough,+ON+M1P+2L5,+Canada%7C480+Progress+Ave,+Scarborough,+ON+M1P+5J1,+Canada");

  }


  calculateAndDisplayRoute() {

    const that = this;
    const wayPoints = [];
    
    this.searchService.locations.forEach(item => {
      wayPoints.push({ location: item.location.candidates[0].formatted_address });
    });


    this.directionsService.route({
      // origin: formValues.source,
      // destination: formValues.destination,

      origin: this.searchService.locations[0].location.candidates[0].formatted_address,
      destination: this.searchService.locations[this.locations.length - 1].location.candidates[0].formatted_address,
      waypoints: wayPoints,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      console.log(response);
      console.log(status);
      console.log(wayPoints);
      wayPoints.forEach(point => {
        this.wayPointsLink += (point.location + '%7C');
      });

      console.log(this.wayPointsLink);
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
        this.navigationLink = 'https://www.google.com/maps/dir/?api=1&origin=' + this.locations[0].location +
          '&destination=' + this.locations[this.locations.length - 1].location +
          '&travelmode=driving' +
          '&waypoints=' + this.wayPointsLink.replace(/\s/g, '+');
        this.navigationLink = this.navigationLink.slice(0, -3).replace(/\s/g, '+');
        console.log(this.navigationLink);

      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
