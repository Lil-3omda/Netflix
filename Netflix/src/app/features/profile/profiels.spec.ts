import { TestBed } from '@angular/core/testing';

import { Profiels } from './profiels';

describe('Profiels', () => {
  let service: Profiels;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Profiels);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
