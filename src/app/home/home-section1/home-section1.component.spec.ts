import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSection1Component } from './home-section1.component';

describe('HomeSection1Component', () => {
  let component: HomeSection1Component;
  let fixture: ComponentFixture<HomeSection1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSection1Component]
    });
    fixture = TestBed.createComponent(HomeSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
