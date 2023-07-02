import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesTestComponent } from './tables-test.component';

describe('TablesTestComponent', () => {
  let component: TablesTestComponent;
  let fixture: ComponentFixture<TablesTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablesTestComponent]
    });
    fixture = TestBed.createComponent(TablesTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
