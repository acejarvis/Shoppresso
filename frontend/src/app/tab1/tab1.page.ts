import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  displayedName;

  showBackdrop = false;
  constructor(public searchService: SearchService, private route: Router) { }

  ngOnInit() {
    console.log('welcome!');
  }

  clickAdd(name: string, store: string, price: string, img: string) {
    this.addItem(this.displayedName, name, store, price, img);
  }

  addItem(expectedName: string, name: string, store: string, price: string, img: string) {
    this.searchService.addItem(expectedName, name, store, price, img).subscribe(res => {
    });
  }
  addItemtoList(name: string, expectedName: string, store: string, price: string, img: string) {
    this.searchService.addItem(expectedName, name, store, price, img).subscribe(res => {
    });
  }
}

