import { TestBed } from '@angular/core/testing';

import { EntityService } from './entity.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EntityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: EntityService = TestBed.get(EntityService);
    expect(service).toBeTruthy();
  });
});
