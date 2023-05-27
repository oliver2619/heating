import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassiveElementComponent } from './new-passive-element.component';

describe('NewPassiveElementComponent', () => {
  let component: NewPassiveElementComponent;
  let fixture: ComponentFixture<NewPassiveElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPassiveElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPassiveElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
