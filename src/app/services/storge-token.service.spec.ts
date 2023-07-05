import { TestBed } from '@angular/core/testing';

import { StorgeTokenService } from './storge-token.service';

describe('StorgeTokenService', () => {
  let service: StorgeTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorgeTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
