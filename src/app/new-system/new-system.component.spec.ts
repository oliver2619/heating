import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSystemComponent } from './new-system.component';

describe('NewSystemComponent', () => {
  let component: NewSystemComponent;
  let fixture: ComponentFixture<NewSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
