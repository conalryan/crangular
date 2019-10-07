import { TestBed } from '@angular/core/testing';

import { CalendargridService } from './calendargrid.service';

describe('CalendargridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendargridService = TestBed.get(CalendargridService);
    expect(service).toBeTruthy();
  });
});
