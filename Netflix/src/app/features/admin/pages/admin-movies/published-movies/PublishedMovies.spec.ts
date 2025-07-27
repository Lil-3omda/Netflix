import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedMovies } from './PublishedMovies';

describe('AdminMovies', () => {
  let component: PublishedMovies;
  let fixture: ComponentFixture<PublishedMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishedMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishedMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
