import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReservationComponent } from './my-reservation.component';

describe('MyReservationComponent', () => {
  let component: MyReservationComponent;
  let fixture: ComponentFixture<MyReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyReservationComponent]
    });
    fixture = TestBed.createComponent(MyReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
