import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IOwnerCarEntity, IOwnerEntity} from "../../ICarOwner/IOwnerEntity";

@Injectable({
  providedIn: 'root'
})
export class OwnersCarsService {
  private baseUrl = 'api/';
  arrayOfCars = new Array;
  isSetId: number | any;
  isWindow = false;
  ifWindowOpen: boolean | any;

  constructor(private http: HttpClient) {
  }

  getOwners(): Observable<IOwnerEntity[]> {
    return this.http.get<IOwnerEntity[]>(this.baseUrl + 'owners');
  }

  getAllCars(): Observable<IOwnerCarEntity> {
    return this.http.get<IOwnerCarEntity>(this.baseUrl + 'cars');
  }

  getOwnerById(ownerId: number): Observable<IOwnerEntity> {
    return this.http.post<IOwnerEntity>(this.baseUrl + `owners/` + ownerId, null);
  }

  editOwnerBy(asOwner: IOwnerEntity): Observable<IOwnerEntity> {
    return this.http.put<IOwnerEntity>(this.baseUrl + `owners`, asOwner);
  }

  deleteOwnerBy(ownerId: number): Observable<IOwnerEntity> {
    return this.http.delete<IOwnerEntity>(this.baseUrl + `owners/` + ownerId);
  }

  addCar(car: any): Observable<IOwnerCarEntity> {
    return this.http.post<IOwnerCarEntity>(this.baseUrl + `cars/`, car);
  }

  deleteCar(id: any) {
    return this.http.delete<number>(this.baseUrl + `cars/`, id);
  }
}
