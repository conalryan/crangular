import { TestBed } from '@angular/core/testing';

import { CrangularService } from './crangular.service';

describe('CrangularService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrangularService = TestBed.get(CrangularService);
    expect(service).toBeTruthy();
  });
});
