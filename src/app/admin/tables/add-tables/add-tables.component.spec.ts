import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTablesComponent } from './add-tables.component';

describe('AddTablesComponent', () => {
  let component: AddTablesComponent;
  let fixture: ComponentFixture<AddTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTablesComponent]
    });
    fixture = TestBed.createComponent(AddTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
