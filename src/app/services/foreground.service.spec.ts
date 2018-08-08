import { TestBed, inject } from '@angular/core/testing';

import { ForegroundService } from './foreground.service';

describe('ForegroundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForegroundService]
    });
  });

  it('should be created', inject([ForegroundService], (service: ForegroundService) => {
    expect(service).toBeTruthy();
  }));
});
