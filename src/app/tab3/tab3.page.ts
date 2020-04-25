import { Component } from '@angular/core';
import { FruitService } from '../services/fruit.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  fruits = [];

  constructor(public fruitService: FruitService) {}
 
  ngOnInit() {
    this.fruitService.loadSaved().then(fruits => this.fruits = fruits);
  }
}
