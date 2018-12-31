import { TestBed, inject } from '@angular/core/testing';

import { AssetService } from './asset.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AssetService ],
    });
  });

  it('should be created', inject([AssetService], (service: AssetService) => {
    expect(service).toBeTruthy();
  }));
});
