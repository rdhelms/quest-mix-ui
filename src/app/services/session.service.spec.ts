import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: SessionService = TestBed.get(SessionService);
    expect(service).toBeTruthy();
  });
});
