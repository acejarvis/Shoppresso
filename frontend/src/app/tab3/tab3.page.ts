import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  itemsList: any[];
  constructor(private searchService: SearchService) {}

  ngOnInit() {
  this.searchService.getAll().subscribe( response => {
    this.itemsList = response;
  });


  }

}
