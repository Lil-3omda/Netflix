import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDeatils } from './movie-deatils';

describe('MovieDeatils', () => {
  let component: MovieDeatils;
  let fixture: ComponentFixture<MovieDeatils>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDeatils]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDeatils);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
