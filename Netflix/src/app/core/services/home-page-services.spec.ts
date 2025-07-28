import { TestBed } from '@angular/core/testing';

import { HomePageServices } from './home-page-services';

describe('HomePageServices', () => {
  let service: HomePageServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomePageServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
