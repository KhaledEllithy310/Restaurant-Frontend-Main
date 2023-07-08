import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripesystemComponent } from './stripesystem.component';

describe('StripesystemComponent', () => {
  let component: StripesystemComponent;
  let fixture: ComponentFixture<StripesystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StripesystemComponent]
    });
    fixture = TestBed.createComponent(StripesystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
