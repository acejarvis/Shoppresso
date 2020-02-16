import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  items = [
    {
      itemName: 'i7-8700k',
      store: 'Bestbuy',
      price: 400,
      description: 'cpu',
      image: 'src/assets/items/i7-8700k.png'
    },
    {
      itemName: '16GB Memory',
      store: 'Bestbuy',
      price: 100,
      description: 'memory',
      image: 'src/assets/items/memory.jfif'
    },
    {
      itemName: 'i7-9700',
      store: 'Bestbuy',
      price: 500,
      description: 'cpu',
      image: 'src/assets/items/i7-8700k.png'
    }
  ];


  constructor(private searchService: SearchService, private route: Router) { }

  ngOnInit() {
    console.log('welcome!');
  }

  private _filterItems(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item => item.itemName.toLowerCase().includes(filterValue));
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.items = this.items.filter((item) => {
        return (item.itemName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }

  }
}

