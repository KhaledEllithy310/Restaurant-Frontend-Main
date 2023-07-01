import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTablesComponent } from './delete-tables.component';

describe('DeleteTablesComponent', () => {
  let component: DeleteTablesComponent;
  let fixture: ComponentFixture<DeleteTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTablesComponent]
    });
    fixture = TestBed.createComponent(DeleteTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
