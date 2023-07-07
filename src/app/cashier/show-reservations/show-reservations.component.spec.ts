import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReservationsComponent } from './show-reservations.component';

describe('ShowReservationsComponent', () => {
  let component: ShowReservationsComponent;
  let fixture: ComponentFixture<ShowReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowReservationsComponent]
    });
    fixture = TestBed.createComponent(ShowReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
