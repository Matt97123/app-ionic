import { Component } from '@angular/core';
import { FruitService } from '../services/fruit.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  fruits = [];

  constructor(public fruitService: FruitService) {}
 
  ngOnInit() {
    this.fruitService.loadSaved().then(fruits => this.fruits = fruits);
  }

}
