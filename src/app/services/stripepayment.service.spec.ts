import { TestBed } from '@angular/core/testing';

import { StripepaymentService } from './stripepayment.service';

describe('StripepaymentService', () => {
  let service: StripepaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripepaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
