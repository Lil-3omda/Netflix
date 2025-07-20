import { TestBed } from '@angular/core/testing';

import { MovieCategory } from './movie-category';

describe('MovieCategory', () => {
  let service: MovieCategory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCategory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
