import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterCartComponent } from './waiter-cart.component';

describe('WaiterCartComponent', () => {
  let component: WaiterCartComponent;
  let fixture: ComponentFixture<WaiterCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterCartComponent]
    });
    fixture = TestBed.createComponent(WaiterCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
