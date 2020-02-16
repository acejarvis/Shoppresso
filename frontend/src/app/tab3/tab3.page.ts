import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { element } from 'protractor';

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

  locations = [
    {
      name: 'i7-8700k',
      location: '20 Baffin Court, Richmond Hill, ON',
      price: '$700'
    },
    {
      name: 'i8-8800k',
      location: '45 Red Maple Rd, Richmond Hill, ON L4B 4M6',
      price: '$600'
    },
    {
      name: 'i9-8900k',
      location: '6364 Yonge St, North York, ON M2M 3X4',
      price: '$670'
    },
    {
      name: 'i10-81000k',
      location: '1265 Military Trail, Scarborough, ON M1C 1A4',
      price: '$89000'

    }
  ];
  constructor(private fb: FormBuilder) {
    // this.createDirectionForm();
  }

  // createDirectionForm() {
  //   this.directionForm = this.fb.group({
  //     source: ['Markham', Validators.required],
  //     destination: ['Toronto', Validators.required]
  //   });
  // }

  ngAfterViewInit(): void {

    this.calculateAndDisplayRoute();

  }

  calculateAndDisplayRoute() {
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    this.directionsDisplay.setMap(map);
    const that = this;
    const wayPoints = [];
    console.log(this.locations);
    this.locations.forEach(item => {
      wayPoints.push({ location: item.location });
    });
    wayPoints.splice(0, 1);
    wayPoints.splice(wayPoints.length - 1, 1);

    this.directionsService.route({
      // origin: formValues.source,
      // destination: formValues.destination,

      origin: this.locations[0].location,
      destination: this.locations[this.locations.length - 1].location,
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
