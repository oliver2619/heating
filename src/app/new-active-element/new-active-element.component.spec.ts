import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActiveElementComponent } from './new-active-element.component';

describe('NewActiveElementComponent', () => {
  let component: NewActiveElementComponent;
  let fixture: ComponentFixture<NewActiveElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewActiveElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewActiveElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
