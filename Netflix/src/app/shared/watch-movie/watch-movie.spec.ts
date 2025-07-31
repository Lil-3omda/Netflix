import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchMovie } from './watch-movie';

describe('WatchMovie', () => {
  let component: WatchMovie;
  let fixture: ComponentFixture<WatchMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
