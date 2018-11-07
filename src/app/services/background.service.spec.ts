import { TestBed } from '@angular/core/testing';

import { BackgroundService } from './background.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BackgroundService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: BackgroundService = TestBed.get(BackgroundService);
    expect(service).toBeTruthy();
  });
});
