import { TestBed } from '@angular/core/testing';

import { ForegroundService } from './foreground.service';

describe('ForegroundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForegroundService = TestBed.get(ForegroundService);
    expect(service).toBeTruthy();
  });
});
