import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedMovies } from './DeletedMovies';

describe('AdminMovies', () => {
  let component: DeletedMovies;
  let fixture: ComponentFixture<DeletedMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
