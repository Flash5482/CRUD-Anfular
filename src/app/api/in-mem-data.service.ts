import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemDataService implements InMemoryDbService {
  createDb() {
    let owners = [
      {id: 1, name: 'Windstorm', surname: 'Ivan', lastName: 'Crops', countOfCar: 1},
      {id: 2, name: 'Olia', surname: 'Grok', lastName: 'Lamson', countOfCar: 1},
      {id: 3, name: 'Vitali', surname: 'Uok', lastName: 'Hops', countOfCar: 1},
      {id: 4, name: 'Andrew', surname: 'Fredson', lastName: 'Lorson', countOfCar: 1},
    ];
    let cars = [
      {id: 'AX3411HP', name: 'Audi', model: 'a4', year: 1990, userId: 1},
      {id: 'AX1541HP', name: 'Porshe', model: 'cayen', year: 2006, userId: 2},
      {id: 'AX1451HP', name: 'Mersedes', model: 'w124', year: 1992, userId: 3},
      {id: 'ВА1131HP', name: 'Opel', model: 'vivaro', year: 2006, userId: 4},
      {id: 'ВА6131HP', name: 'Opel', model: 'vivaro', year: 2006, userId: 1},
    ];
    return {owners, cars};
  }
}
