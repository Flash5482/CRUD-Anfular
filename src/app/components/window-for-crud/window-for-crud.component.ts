import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {OwnersCarsService} from "../../services/CarsService/cars.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {IOwnerCarEntity, IOwnerEntity} from "../../ICarOwner/IOwnerEntity";
import {filter, map} from "rxjs/operators";

class DialogData {
}

@Component({
  selector: 'app-window-for-crud',
  templateUrl: './window-for-crud.component.html',
  styleUrls: ['./window-for-crud.component.scss']
})
export class WindowForCRUDComponent implements OnInit {
  owner: FormGroup | any;
  carOwners: FormGroup | any;

  dataCars: any;
  dataOwner: IOwnerEntity | any;
  disabledItem = false;
  isAddCar = false;
  noUpdate = true;

  constructor(public ownersCarsService: OwnersCarsService, @Inject(MAT_DIALOG_DATA) data: DialogData) {
    this.dataOwner = data;
    console.log(data);
  }

  ngOnInit(): void {
    this.ownersCarsService.ifWindowOpen = true;
    if (this.dataOwner.typeOfDialogRead === 'read') {
      this.disabledItem = true;
    } else {
      this.disabledItem = false;
    }
    this.owner = new FormGroup({
      name: new FormControl({value: '', disabled: this.disabledItem}),
      firstName: new FormControl({value: '', disabled: this.disabledItem}),
      lastName: new FormControl({value: '', disabled: this.disabledItem}),
      number: new FormControl({value: '', disabled: this.disabledItem}),
      nameCare: new FormControl({value: '', disabled: this.disabledItem}),
      model: new FormControl({value: '', disabled: this.disabledItem}),
      year: new FormControl({value: '', disabled: this.disabledItem}),
    });

    this.fetchCars();
    if (this.dataOwner.typeOfDialogRead !== '') {
      this.setOwner();
    }
  }

  get Name() {
    return this.owner.get('name');
  }

  get firstName() {
    return this.owner.get('firstName');
  }

  get lastName() {
    return this.owner.get('lastName');
  }

  get NameCare() {
    return this.owner.get('nameCare');
  }

  get Number() {
    return this.owner.get('number');
  }

  get Model() {
    return this.owner.get('model');
  }

  get Year() {
    return this.owner.get('year');
  }

  setOwner() {
    this.owner.controls['name'].setValue(this.dataOwner.dataOwner.name);
    this.owner.controls['firstName'].setValue(this.dataOwner.dataOwner.surname);
    this.owner.controls['lastName'].setValue(this.dataOwner.dataOwner.lastName);
  }

  fetchCars() {
    const dataOwnerId = this.dataOwner.dataOwner.id;
    this.ownersCarsService.getAllCars()
      .pipe(map((items: any) =>
        items.filter((item: any) => item.userId === dataOwnerId)))
      .subscribe((response: any) => {
        this.dataCars = response;
      })
  }

  delete() {
      if (this.ownersCarsService.isSetId) {
        this.dataCars = this.dataCars?.filter((item: IOwnerCarEntity) => item.id !== this.ownersCarsService.isSetId);
        this.ownersCarsService.deleteCar(this.ownersCarsService.isSetId).subscribe();
      } else {
        window.alert('You need to chose any item');
      }
  }

  addColumn() {
    this.isAddCar = true;
  }

  addCar() {
    this.isAddCar = false;
    console.log(this.owner.value);
    const objCar = {
      id: this.owner.value['number'],
      name: this.owner.value['nameCare'],
      model: this.owner.value['model'],
      year: +this.owner.value['year'],
      userId: this.dataOwner.dataOwner.id
    }
    console.log(objCar);
    this.ownersCarsService.addCar(objCar).subscribe(() => {
      this.fetchCars();
    });
    this.dataCars.push(objCar);

    console.log(this.dataCars);

  }

  onSubmit() {
    if (this.noUpdate) {
      this.dataOwner.dataOwner.name = this.owner.value['name'];
      this.dataOwner.dataOwner.surname = this.owner.value['firstName'];
      this.dataOwner.dataOwner.lastName = this.owner.value['lastName'];
      console.log(this.dataOwner.dataOwner);
      this.ownersCarsService.editOwnerBy(this.dataOwner.dataOwner).subscribe( (rep) =>{
        console.log(rep);
      });
    }
  }

  save(){
    this.onSubmit();
  }

}
