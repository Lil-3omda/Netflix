import { TestBed } from '@angular/core/testing';

import { Moviedetails } from './moviedetails';

describe('Moviedetails', () => {
  let service: Moviedetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Moviedetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
