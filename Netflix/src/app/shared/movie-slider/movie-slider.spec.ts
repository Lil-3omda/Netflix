import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSlider } from './movie-slider';
import { EventEmitter, output } from '@angular/core';


describe('MovieSlider', () => {
  let component: MovieSlider;
  let fixture: ComponentFixture<MovieSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
