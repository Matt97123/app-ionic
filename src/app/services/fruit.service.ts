import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  public fruits: Fruit[] = [ {
    nom: "fraise",
    poids: 1 },{
    nom: "orange",
    poids: 3 },{
    nom: "ananas",
    poids: 12 
  } ];

  private FRUIT_STORAGE: string = "fruits";
  
  constructor(private location: Location) { }

  public async addFruit(newFruit: Fruit) {
       
    this.fruits.push(newFruit);
    this.location.back();

    Storage.set({
      key: this.FRUIT_STORAGE,
      value: JSON.stringify(this.fruits)
    });
  }
  
  public async loadSaved() {
    const fruits = await Storage.get({ key: this.FRUIT_STORAGE });
    this.fruits = JSON.parse(fruits.value) || [];

    return this.fruits;
  }

  public async deleteFruit(newFruit: Fruit) {
    this.fruits = this.fruits.filter(f => f !== newFruit);

    Storage.set({
      key: this.FRUIT_STORAGE,
      value: JSON.stringify(this.fruits)
    });
  }

  public async Filter(regex, weightFilter, sortBy) {
    
    switch (regex) {
      case 'A..F' : regex = /^[a-f]*?$/;
      break;
      case 'G..L' : regex = /^[g-l]*?$/;
      break;
      case 'M..S' : regex = /^[m-s]*?$/;
      break;
      case 'T..Z' : regex = /^[t-z]*?$/;
      break;
      default : regex = /^[a-z]*?$/;
    }
    this.fruits.forEach(element => {
      if (!element.nom.charAt(0).match(regex)) {
        this.fruits = this.fruits.filter(f => f !== element);
        this.searchByWeight(weightFilter);
      }
    });
    if (sortBy == 'ordre alphabétique') {
      this.sortByAlpha();
    } else if (sortBy == 'poids croissant') {
      this.sortByWeight();
    }
    
    this.location.back();
  }

  public async searchByWeight(weightFilter) {
    this.fruits.forEach(element => {
      switch (weightFilter) {
        case 'inférieur à 2 kg' : if (element.poids > 2) {
          this.fruits = this.fruits.filter(f => f !== element);
        }
        break;
        case 'entre 2 et 5 kg' : if (element.poids < 2 || element.poids > 5) {
          this.fruits = this.fruits.filter(f => f !== element);
        }
        break;
        case 'entre 5 et 10 kg' : if (element.poids < 5 || element.poids > 10) {
          this.fruits = this.fruits.filter(f => f !== element);
        }
        break;
        case 'plus de 10 kg...' : if (element.poids < 10) {
          this.fruits = this.fruits.filter(f => f !== element);
        }
        break;
        default : if (element.poids < 0) {
          this.fruits = this.fruits.filter(f => f !== element);
        }
      }
    });
  }

  public async sortByAlpha() {
    this.fruits = this.fruits.sort(function compare(a, b) {
      if (a.nom < b.nom)
         return -1;
      if (a.nom > b.nom )
         return 1;
      return 0;
    });
  }
  public async sortByWeight() {
    this.fruits = this.fruits.sort((a, b) => a.poids - b.poids);
  }

  public async refresh() {
    this.location.back();
  }
}

interface Fruit {
  nom: string,
  poids: number
}