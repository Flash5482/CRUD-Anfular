export interface IOwnerEntity {
  id: number;
  name: string;
  surname: string;
  lastName: string;
  countOfCar: number;
}

export interface IOwnerCarEntity {
  id: string;
  name: string;
  model: string;
  year: number;
  userId: number;
}
