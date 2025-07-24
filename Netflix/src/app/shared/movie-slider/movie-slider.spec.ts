import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSliderSectionComponent } from './movie-slider';
import { EventEmitter, output } from '@angular/core';


describe('MovieSlider', () => {
  let component: MovieSliderSectionComponent;
  let fixture: ComponentFixture<MovieSliderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSliderSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSliderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
