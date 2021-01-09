import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSystemsComponent } from './active-systems.component';

describe('ActiveSystemsComponent', () => {
  let component: ActiveSystemsComponent;
  let fixture: ComponentFixture<ActiveSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSystemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
