import { TestBed } from '@angular/core/testing';

import { IngridentsService } from './ingridents.service';

describe('IngridentsService', () => {
  let service: IngridentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngridentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
