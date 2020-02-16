import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  title = 'tab1';
  constructor(private route: Router) {}
  ngOnInit() {

    switch (this.route.url.charAt(9)) {
      default:
      case '1': this.title = 'Search'; break;
      case '2': this.title = 'Shopping List'; break;
      case '3': this.title = 'Search'; break;
    }
  }

  updateTitle(name: string) {
    this.title = name;
  }
}
