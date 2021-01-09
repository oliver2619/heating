import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatingComponent } from './heating.component';

describe('HeatingComponent', () => {
  let component: HeatingComponent;
  let fixture: ComponentFixture<HeatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
