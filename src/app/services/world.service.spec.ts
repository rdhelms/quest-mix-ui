import { TestBed, inject } from '@angular/core/testing';

import { WorldService } from './world.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WorldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [WorldService]
    });
  });

  it('should be created', inject([WorldService], (service: WorldService) => {
    expect(service).toBeTruthy();
  }));
});
