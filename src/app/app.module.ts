import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemDataService} from "./api/in-mem-data.service";
import {OwnerComponent} from "./components/people/owner.component";
import {CarsComponent} from './components/cars/cars.component';
import {MatButtonModule} from "@angular/material/button";
import {TableComponent} from './components/people/table/table.component';
import {MatTableModule} from "@angular/material/table";
import {TableCellComponent} from './components/people/table/table-cell/table-cell.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {WindowForCRUDComponent} from './components/window-for-crud/window-for-crud.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { ErrorWindowComponent } from './components/window-for-crud/error-window/error-window.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent,
    CarsComponent,
    TableComponent,
    TableCellComponent,
    WindowForCRUDComponent,
    ErrorWindowComponent,
  ],
  entryComponents: [WindowForCRUDComponent],
  imports: [
    MatInputModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemDataService, {dataEncapsulation: false}
    ),
    ReactiveFormsModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule
  ],
  providers: [ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
