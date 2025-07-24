import { TestBed } from '@angular/core/testing';

import { ProfilesService } from './profiels';

describe('Profiles', () => {
  let service: ProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
