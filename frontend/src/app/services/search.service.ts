import { Injectable } from '@angular/core';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  shoppingList = [{
    itemName: 'i9-9900k',
    store: 'Canada Computers',
    price: 800,
    description: 'cpu',
  },
  {
    itemName: 'RTX 2080ti',
    store: 'Best Buy',
    price: 1300,
    decription: 'gpu',
  },
  {
    itemName: 'GTX 1660',
    store: 'Canada Computers',
    price: 350,
    description: 'gpu',
  },
  {
    itemName: 'G-Skill Ripjaws 16gb 3200mHz kit',
    store: 'Best Buy',
    price: 72,
    description: 'memory',
  },
  {
    itemName: 'Deepcool Matrexx 50 rgb',
    store: 'Canada Computers',
    price: 85,
    description: 'computer case',
  },
  {
    itemName: '512gb ssd',
    store: 'Canada Comptuers',
    price: 92,
    description: 'Storage',
  },
  {
    itemName: '256gb ssd',
    store: 'Best Buy',
    price: 40,
    description: 'Storage',
  },
  {
    itemName: 'Ryzen 5 3600',
    store: 'Canada Computers',
    price: 240,
    description: 'cpu',
  },
  {
    itemName: 'Ryzen 7 3700x',
    store: 'Best Buy',
    price: 450,
    description: 'cpu'
  },
  {
    itemName: '1tb WD blue hdd',
    store: 'Best Buy',
    price: 50,
    description: 'storage',
  },
  {
    itemName: 'NZXT H500i',
    store: 'Canada Comptuters',
    price: 100,
    description: 'computer case',
  }];

  locations = [];
  isOK = false;
  constructor(private http: HttpclientService) { }

  searchItems(value: string): Observable<any[]> {
    const body = {
      name: value
    };
    return this.http.dashPost<any[]>('search/', JSON.stringify(body));
  }

  getAll(): Observable<any[]> {
    return this.http.dashGet<any[]>('getlist/');
  }

  getNearStore(name: string): Observable<any[]> {
    const path = 'place/findplacefromtext/json?input=';
    return this.http.mapGet<any[]>(path + name + '&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=');
  }

}
