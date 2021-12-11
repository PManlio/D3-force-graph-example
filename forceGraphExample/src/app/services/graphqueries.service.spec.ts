import { TestBed } from '@angular/core/testing';

import { GraphqueriesService } from './graphqueries.service';

describe('GraphqueriesService', () => {
  let service: GraphqueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
