import { TestBed } from '@angular/core/testing';

import { BusbookService } from './busbook.service';

describe('BusbookService', () => {
  let service: BusbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
