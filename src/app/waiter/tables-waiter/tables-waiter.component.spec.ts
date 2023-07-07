import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesWaiterComponent } from './tables-waiter.component';

describe('TablesWaiterComponent', () => {
  let component: TablesWaiterComponent;
  let fixture: ComponentFixture<TablesWaiterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablesWaiterComponent]
    });
    fixture = TestBed.createComponent(TablesWaiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
