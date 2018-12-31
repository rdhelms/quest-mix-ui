import { TestBed } from '@angular/core/testing';

import { AvatarService } from './avatar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AvatarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: AvatarService = TestBed.get(AvatarService);
    expect(service).toBeTruthy();
  });
});
