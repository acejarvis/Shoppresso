import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  title = 'tab1';
  searchQuery;
  constructor(private searchService: SearchService, private route: Router) { }
  ngOnInit() {

    switch (this.route.url.charAt(9)) {
      default:
      case '1': this.title = 'Search'; break;
      case '2': this.title = 'Shopping List'; break;
      case '3': this.title = 'Search'; break;
    }
  }

  search() {
    this.searchService.search(this.searchQuery).subscribe(res => {
      this.searchService.searchResult = res;
    });
  }

  updateTitle(name: string) {
    this.title = name;
  }
}
