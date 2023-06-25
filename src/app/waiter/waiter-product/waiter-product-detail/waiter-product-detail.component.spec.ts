import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterProductDetailComponent } from './waiter-product-detail.component';

describe('WaiterProductDetailComponent', () => {
  let component: WaiterProductDetailComponent;
  let fixture: ComponentFixture<WaiterProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterProductDetailComponent]
    });
    fixture = TestBed.createComponent(WaiterProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
