import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIngridentsComponent } from './edit-ingridents.component';

describe('EditIngridentsComponent', () => {
  let component: EditIngridentsComponent;
  let fixture: ComponentFixture<EditIngridentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditIngridentsComponent]
    });
    fixture = TestBed.createComponent(EditIngridentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
