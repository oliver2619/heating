import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveElementsComponent } from './active-elements.component';

describe('ActiveElementsComponent', () => {
  let component: ActiveElementsComponent;
  let fixture: ComponentFixture<ActiveElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
