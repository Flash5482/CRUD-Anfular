import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowForCRUDComponent } from './window-for-crud.component';

describe('WindowForCRUDComponent', () => {
  let component: WindowForCRUDComponent;
  let fixture: ComponentFixture<WindowForCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowForCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowForCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
