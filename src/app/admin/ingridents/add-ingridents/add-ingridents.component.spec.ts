import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngridentsComponent } from './add-ingridents.component';

describe('AddIngridentsComponent', () => {
  let component: AddIngridentsComponent;
  let fixture: ComponentFixture<AddIngridentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIngridentsComponent]
    });
    fixture = TestBed.createComponent(AddIngridentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
