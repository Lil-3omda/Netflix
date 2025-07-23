import { TestBed } from '@angular/core/testing';

import { Profiles } from './profiels';

describe('Profiles', () => {
  let service: Profiles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Profiles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
