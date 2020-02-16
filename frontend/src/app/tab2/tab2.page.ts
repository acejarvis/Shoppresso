import { Component, ViewChild, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { IonReorderGroup } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tab3Page } from '../tab3/tab3.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  shoppingList = [];

  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;
  @ViewChild(Tab3Page, {static: false}) tab3: Tab3Page;

  constructor(private searchService: SearchService, private router: Router) {
  }

  ngOnInit() {
    this.shoppingList = this.searchService.shoppingList;
  }

  generateMap() {
    this.shoppingList.forEach(element => {
      this.searchService.getNearStore(element.store).subscribe(response => {
        console.log(response);
        this.searchService.locations.push({ location: response });
      });
    });
    console.log(this.searchService.locations);
    this.router.navigateByUrl('tabs/tabs/tab3');


  }






}
