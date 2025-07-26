import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviveDetalis } from './movive-detalis';

describe('MoviveDetalis', () => {
  let component: MoviveDetalis;
  let fixture: ComponentFixture<MoviveDetalis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviveDetalis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviveDetalis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
