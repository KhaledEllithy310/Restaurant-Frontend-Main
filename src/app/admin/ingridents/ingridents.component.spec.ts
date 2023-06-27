import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngridentsComponent } from './ingridents.component';

describe('IngridentsComponent', () => {
  let component: IngridentsComponent;
  let fixture: ComponentFixture<IngridentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngridentsComponent]
    });
    fixture = TestBed.createComponent(IngridentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
