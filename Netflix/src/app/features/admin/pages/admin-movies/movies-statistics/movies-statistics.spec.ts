import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesStatistics } from './movies-statistics';

describe('MoviesStatistics', () => {
  let component: MoviesStatistics;
  let fixture: ComponentFixture<MoviesStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesStatistics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesStatistics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
