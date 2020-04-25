import { Component } from '@angular/core';
import { FruitService } from '../services/fruit.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  fruits = [];

  constructor(public fruitService: FruitService) {}
 
  ngOnInit() {
    this.fruitService.loadSaved().then(fruits => this.fruits = fruits);
  }
}
