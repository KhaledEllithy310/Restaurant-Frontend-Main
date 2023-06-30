import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountnumberComponent } from './CountnumberComponent';

describe('CountnumberComponent', () => {
  let component: CountnumberComponent;
  let fixture: ComponentFixture<CountnumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountnumberComponent]
    });
    fixture = TestBed.createComponent(CountnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
