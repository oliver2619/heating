import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveElementComponent } from './passive-element.component';

describe('PassiveElementComponent', () => {
  let component: PassiveElementComponent;
  let fixture: ComponentFixture<PassiveElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassiveElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
