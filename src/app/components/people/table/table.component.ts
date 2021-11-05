import {Component, Input} from '@angular/core';
import {OwnersCarsService} from "../../../services/CarsService/cars.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataOwner: any;
  @Input() isWindow: any;
  selected = false;

  isCheck: boolean | any;
  isSetId: any;
  displayedColumns: string[] = ['name', 'surname', 'lastName', 'countOfCar'];
  displayedColumnsCars: string[] = ['id', 'name', 'model', 'year'];

  constructor(public ownersCarsService: OwnersCarsService) {
    if (ownersCarsService.ifWindowOpen) {
      this.displayedColumns = ['id', 'name', 'model', 'year'];
    }
  }

  setColumn(id: any) {
    this.ownersCarsService.isSetId = id;
  }
}
