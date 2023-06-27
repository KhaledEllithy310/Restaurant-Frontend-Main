import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionComponent } from './home-section.component';

describe('HomeSectionComponent', () => {
  let component: HomeSectionComponent;
  let fixture: ComponentFixture<HomeSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSectionComponent]
    });
    fixture = TestBed.createComponent(HomeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
