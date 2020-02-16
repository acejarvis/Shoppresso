import { Component, ViewChild, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { IonReorderGroup } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tab3Page } from '../tab3/tab3.page';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  shoppingList = [];
  selectedDate = new Date();
  selectedDateString = '';

  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;
  @ViewChild(Tab3Page, {static: false}) tab3: Tab3Page;

  constructor(
    private searchService: SearchService, 
    private router: Router, 
    private userService: UserService,
    private datePipe: DatePipe
    ) {
    this.selectedDateString = this.datePipe.transform(this.selectedDate,'yyyy-MM-dd');
  }

  ngOnInit() {
    this.shoppList(new Date());
  }

  shoppList(date: Date) {
    this.userService.getShoppingList(date).subscribe(response => {
      this.shoppingList = response;
      console.log(this.shoppList);
    });
  }

  generateMap() {
    this.shoppingList.forEach(element => {
      this.searchService.getNearStore(element.store).subscribe(response => {
        console.log(response);
        this.searchService.locations.push({ location: response });
      });
    });
    this.searchService.getNearStore('Your Location').subscribe(response => {
      console.log(response);
      this.userService.currentLocation = response;
    });
    console.log(this.searchService.locations);
    this.router.navigateByUrl('tabs/tabs/tab3');


  }






}
