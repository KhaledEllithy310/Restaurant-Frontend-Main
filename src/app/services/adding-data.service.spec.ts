import { TestBed } from '@angular/core/testing';

import { AddingDataService } from './adding-data.service';

describe('AddingDataService', () => {
  let service: AddingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
