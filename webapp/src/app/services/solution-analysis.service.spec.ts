import { TestBed } from '@angular/core/testing';

import { SolutionAnalysisService } from './solution-analysis.service';

describe('SolutionAnalysisService', () => {
  let service: SolutionAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
