import { Component } from '@angular/core';
import {OwnersCarsService} from "./services/CarsService/cars.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'untitled1';
  constructor(private ownersCarsService: OwnersCarsService) {
  }


}
