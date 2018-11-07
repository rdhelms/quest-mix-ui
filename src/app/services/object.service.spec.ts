import { TestBed } from '@angular/core/testing';

import { ObjectService } from './object.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ObjectService = TestBed.get(ObjectService);
    expect(service).toBeTruthy();
  });
});
