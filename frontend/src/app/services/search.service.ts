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
    location: '1306 Kennedy Rd, Scarborough, ON M1P 2L5',
    price: 800,
    description: 'cpu',
},
{
    itemName: 'RTX 2080ti',
    store: 'Best Buy',
    location: '695 Wilson Ave, Toronto, ON M3K 1E3',
    price: 1300,
    decription: 'gpu',
},
{
    itemName: 'GTX 1660',
    store: 'Canada Computers',
    location: '1306 Kennedy Rd, Scarborough, ON M1P 2L5',
    price: 350,
    description: 'gpu',
},
{
    itemName: 'G-Skill Ripjaws 16gb 3200mHz kit',
    store: 'Best Buy',
    location: '695 Wilson Ave, Toronto, ON M3K 1E3',
    price: 72,
    description: 'memory',
},
{
    itemName: 'Deepcool Matrexx 50 rgb',
    store: 'Canada Computers',
    location: '1306 Kennedy Rd, Scarborough, ON M1P 2L5',
    price: 85,
    description: 'computer case',
},
{
    itemName: '512gb ssd',
    store: 'Canada Comptuers',
    location: '1306 Kennedy Rd, Scarborough, ON M1P 2L5',
    price: 92,
    description: 'Storage',
},
{
    itemName: '256gb ssd',
    store: 'Best Buy',
    location: '695 Wilson Ave, Toronto, ON M3K 1E3',
    price: 40,
    description: 'Storage',
},
{
    itemName: 'Ryzen 5 3600',
    store: 'Canada Computers',
    location: '1306 Kennedy Rd, Scarborough, ON M1P 2L5',
    price: 240,
    description: 'cpu',
},
{
    itemName: 'Ryzen 7 3700x',
    store: 'Best Buy',
    location: '695 Wilson Ave, Toronto, ON M3K 1E3',
    price: 450,
    description: 'cpu'
},
{
    itemName: '1tb WD blue hdd',
    store: 'Best Buy',
    location: '695 Wilson Ave, Toronto, ON M3K 1E3',
    price: 50,
    description: 'storage',
},
{
    itemName: 'NZXT H500i',
    store: 'Canada Comptuters',
    location: '695 Wilson Ave, Toronto, ON M3K 1E3',
    price: 100,
    description: 'computer case',
}];
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
}
