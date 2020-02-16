import { Component, ViewChild, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { IonReorderGroup } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  shoppingList = [];

  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;

  constructor(private searchService: SearchService) {
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
    this.searchService.isOK = true;
    console.log(this.searchService.locations);
  }






}
