import { TestBed } from '@angular/core/testing';

import { HeatingErrorHandlerService } from './heating-error-handler.service';

describe('HeatingErrorHandlerService', () => {
  let service: HeatingErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeatingErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
