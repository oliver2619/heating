import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupCommonComponent } from './setup-common.component';

describe('SetupCommonComponent', () => {
  let component: SetupCommonComponent;
  let fixture: ComponentFixture<SetupCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupCommonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
