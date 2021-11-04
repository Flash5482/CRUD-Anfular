import {Component, OnInit} from '@angular/core';
import {OwnersCarsService} from "../../services/CarsService/cars.service";
import {IOwnerEntity} from "../../ICarOwner/IOwnerEntity";
import {MatDialog} from "@angular/material/dialog";
import {WindowForCRUDComponent} from "../window-for-crud/window-for-crud.component";

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-people',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  public dataOwners: IOwnerEntity[] | undefined;
  isWindow: false | any;
  dataOwner: any;
  typeOfDialogWindow = 'read';

  constructor(public dialog: MatDialog, public ownersCarsService: OwnersCarsService) {
  }


  ngOnInit(): void {
    this.fetchPeople();
  }

  fetchPeople() {
    this.ownersCarsService.getOwners().subscribe((response: IOwnerEntity[] | any) => {
      this.ownersCarsService.dataOwners = response;
      this.ownersCarsService.lastId =  this.ownersCarsService.dataOwners?.length
    })
  }

  delete() {
    if (this.ownersCarsService.isSetId) {
      this.ownersCarsService.dataOwners = this.ownersCarsService.dataOwners?.filter((item: any) => item.id !== this.ownersCarsService.isSetId);
      this.ownersCarsService.deleteOwnerBy(1).subscribe();
    } else {
      window.alert('You need to chose any item');
    }
  }

  openWindow(typeWindow: string) {
    this.dataOwner = this.ownersCarsService.dataOwners?.find((item: any) => item.id === this.ownersCarsService.isSetId);
    console.log(this.dataOwner);
    if (this.dataOwner || typeWindow === 'add') {
      this.ownersCarsService.ifWindowOpen = true;
      let dialogRef = this.dialog.open(WindowForCRUDComponent, {
        width: ' 800px',
        height: ' 700px',
        data: {dataOwner: this.dataOwner, typeOfDialogRead: typeWindow}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ownersCarsService.ifWindowOpen = false;
      });
    } else {
      window.alert('You need to chose any item');
    }
  }
}
