import {Component, OnInit} from '@angular/core';
import {OwnersCarsService} from "../../services/CarsService/cars.service";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor(private carsService: OwnersCarsService) {
  }

  ngOnInit(): void {
    this.fetchCars();
  }

  fetchCars() {
    this.carsService.getAllCars().subscribe()
  }
}
