import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLoginComponent } from './staff-login.component';

describe('StaffLoginComponent', () => {
  let component: StaffLoginComponent;
  let fixture: ComponentFixture<StaffLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffLoginComponent]
    });
    fixture = TestBed.createComponent(StaffLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
