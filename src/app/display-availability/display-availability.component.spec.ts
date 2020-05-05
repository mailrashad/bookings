import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAvailabilityComponent } from './display-availability.component';

describe('DisplayAvailabilityComponent', () => {
  let component: DisplayAvailabilityComponent;
  let fixture: ComponentFixture<DisplayAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
