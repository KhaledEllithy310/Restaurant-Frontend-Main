import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterProductListComponent } from './waiter-product-list.component';

describe('WaiterProductListComponent', () => {
  let component: WaiterProductListComponent;
  let fixture: ComponentFixture<WaiterProductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterProductListComponent]
    });
    fixture = TestBed.createComponent(WaiterProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
