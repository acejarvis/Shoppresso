import { Component, ViewChild } from '@angular/core';
import { SearchService } from '../services/search.service';
import { IonReorderGroup } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

shoppingList = [];

@ViewChild(IonReorderGroup, {static: true}) reorderGroup: IonReorderGroup;

  constructor(private searchService: SearchService) {
    this.shoppingList = this.searchService.shoppingList;
  }



  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Before complete', this.shoppingList);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.shoppingList = ev.detail.complete(this.shoppingList);

    // After complete is called the items will be in the new order
    console.log('After complete', this.shoppingList);
  }


}
