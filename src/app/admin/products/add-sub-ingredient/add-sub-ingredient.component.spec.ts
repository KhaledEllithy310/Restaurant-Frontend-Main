import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubIngredientComponent } from './add-sub-ingredient.component';

describe('AddSubIngredientComponent', () => {
  let component: AddSubIngredientComponent;
  let fixture: ComponentFixture<AddSubIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubIngredientComponent]
    });
    fixture = TestBed.createComponent(AddSubIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
