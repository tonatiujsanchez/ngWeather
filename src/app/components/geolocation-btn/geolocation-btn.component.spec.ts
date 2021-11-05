import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationBtnComponent } from './geolocation-btn.component';

describe('GeolocationBtnComponent', () => {
  let component: GeolocationBtnComponent;
  let fixture: ComponentFixture<GeolocationBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeolocationBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
