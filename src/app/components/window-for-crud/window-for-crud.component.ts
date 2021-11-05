import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {OwnersCarsService} from "../../services/CarsService/cars.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
  carsForm: FormGroup | any;
  newOwner: IOwnerEntity | any;
  dataCars: any;
  dataAllCars: any;
  dataOwner: IOwnerEntity | any;
  disabledItem = false;
  isAddCar = false;
  noUpdate = true;
  countOfCars = 0;
  dataOwnerId: number | any;

  constructor(public ownersCarsService: OwnersCarsService, @Inject(MAT_DIALOG_DATA) data: DialogData, public dialogRef: MatDialogRef<WindowForCRUDComponent>) {
    this.dataOwner = data;
  }

  ngOnInit(): void {
    this.fetchAllCars();
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

    this.carsForm = new FormGroup({
      number: new FormControl({
        value: '',
        disabled: this.disabledItem
      }),
      nameCare: new FormControl({value: '', disabled: this.disabledItem}),
      model: new FormControl({value: '', disabled: this.disabledItem}),
      year: new FormControl({
        value: '',
        disabled: this.disabledItem
      }),
    });
    this.Year.addValidators([Validators.pattern('[0-9]{4}'), this.validateYear]);
    this.Number.addValidators([Validators.pattern('^[А-ЯA-Z]{2}[0-9]{4}[А-ЯA-Z]{2}')]);
    this.fetchCars();
    if (this.dataOwner.typeOfDialogRead !== '') {
      this.setOwner();
    }
  }

  validateYear(formControl: FormControl) {
    if (formControl.value < 1990 || formControl.value > 2021) {
      return {validateYear: {message: 'Should be between 1990 and 2021'}}
    }
    return null;
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
    return this.carsForm.get('nameCare');
  }

  get Number() {
    return this.carsForm.get('number');
  }

  get Model() {
    return this.carsForm.get('model');
  }

  get Year() {
    return this.carsForm.get('year');
  }

  setOwner() {
    this.owner.controls['name'].setValue(this.dataOwner.dataOwner.name);
    this.owner.controls['firstName'].setValue(this.dataOwner.dataOwner.surname);
    this.owner.controls['lastName'].setValue(this.dataOwner.dataOwner.lastName);
  }

  fetchCars() {
    if (this.dataOwner.typeOfDialogRead === 'add') {
      this.dataOwnerId = ++this.ownersCarsService.lastId;
    } else {
      this.dataOwnerId = this.dataOwner.dataOwner.id;
    }
    this.ownersCarsService.getAllCars()
      .pipe(map((items: any) =>
        items.filter((item: any) => item.userId === this.dataOwnerId)))
      .subscribe((response: any) => {
        this.dataCars = response;
        this.countOfCars = this.dataCars.length;
      })
  }

  fetchAllCars() {
    this.ownersCarsService.getAllCars()
      .subscribe((response: any) => {
        this.dataAllCars = response;
      })
  }

  delete() {
    if (typeof this.ownersCarsService.isSetId !== "number") {
      this.ownersCarsService.deleteCar(this.ownersCarsService.isSetId).subscribe(() => {
          this.dataOwner.dataOwner.countOfCar--;
          this.dataCars = this.dataCars?.filter((item: IOwnerCarEntity) => item.id !== this.ownersCarsService.isSetId)
          this.dataCars = [...this.dataCars];
        }
      );
    } else {
      window.alert('You need to chose any item');
    }
  }

  addCars(id: number) {
    const ifNumberAlreadyExist = this.dataAllCars.some((item: any) => item.id === this.Number.value);
    if (ifNumberAlreadyExist) {
      window.alert('THis car are already exists');
    } else {
      this.isAddCar = false;
      const objCar = {
        id: this.carsForm.value['number'],
        name: this.carsForm.value['nameCare'],
        model: this.carsForm.value['model'],
        year: +this.carsForm.value['year'],
        userId: id
      }
      this.countOfCars++;
      if (this.dataOwner.dataOwner !== null) {
        this.dataOwner.dataOwner.countOfCar = this.countOfCars;
      }
      this.ownersCarsService.addCar(objCar).subscribe(() => {
        this.dataCars.push(objCar);
        this.dataCars = [...this.dataCars];
      });
      this.Number.setValue('');
      this.Model.setValue('');
      this.NameCare.setValue('');
      this.Year.setValue('');
    }
  }

  addCar() {
    if (this.dataOwner.typeOfDialogRead === 'add') {
      this.addCars(this.ownersCarsService.lastId);
    } else {
      this.addCars(this.dataOwner.dataOwner.id);
    }
  }

  onUpdate() {
    this.dataOwner.dataOwner.name = this.owner.value['name'];
    this.dataOwner.dataOwner.surname = this.owner.value['firstName'];
    this.dataOwner.dataOwner.lastName = this.owner.value['lastName'];
    this.ownersCarsService.editOwnerBy(this.dataOwner.dataOwner).subscribe();
  }

  onAddOwner() {
    this.newOwner = {
      id: this.ownersCarsService.lastId,
      name: this.owner.value['name'],
      surname: this.owner.value['firstName'],
      lastName: this.owner.value['lastName'],
      countOfCar: this.countOfCars
    }
    this.ownersCarsService.addOwner(this.newOwner).subscribe(() => {
      this.ownersCarsService.dataOwners.push(this.newOwner);
      this.ownersCarsService.dataOwners = [...this.ownersCarsService.dataOwners];
    });
  }

  onSubmit() {
    this.dataOwner.typeOfDialogRead === 'add' ? this.onAddOwner() : this.onUpdate();
  }

  onSubmitCar() {
  }

  save() {
    this.onSubmit();
    this.dialogRef.close(WindowForCRUDComponent);
  }
}
