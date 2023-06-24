import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterProductItemComponent } from './waiter-product-item.component';

describe('WaiterProductItemComponent', () => {
  let component: WaiterProductItemComponent;
  let fixture: ComponentFixture<WaiterProductItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterProductItemComponent]
    });
    fixture = TestBed.createComponent(WaiterProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
