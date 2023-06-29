import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalSliderComponent } from './vertical-slider.component';

describe('VerticalSliderComponent', () => {
  let component: VerticalSliderComponent;
  let fixture: ComponentFixture<VerticalSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalSliderComponent]
    });
    fixture = TestBed.createComponent(VerticalSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
