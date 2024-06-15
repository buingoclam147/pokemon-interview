import { TestBed } from '@angular/core/testing';

import { SpinService } from './spin.service';

describe('SpinService', () => {
  let service: SpinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
