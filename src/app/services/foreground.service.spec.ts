import { TestBed } from '@angular/core/testing';

import { ForegroundService } from './foreground.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForegroundService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
  }));

  it('should be created', () => {
    const service: ForegroundService = TestBed.get(ForegroundService);
    expect(service).toBeTruthy();
  });
});
