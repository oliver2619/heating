import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveElementsComponent } from './passive-elements.component';

describe('PassiveElementsComponent', () => {
  let component: PassiveElementsComponent;
  let fixture: ComponentFixture<PassiveElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassiveElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
