import { TestBed } from '@angular/core/testing';

import { UploadchallengeService } from './uploadchallenge.service';

describe('UploadchallengeService', () => {
  let service: UploadchallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadchallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
