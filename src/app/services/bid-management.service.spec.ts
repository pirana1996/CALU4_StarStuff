import { TestBed, inject } from '@angular/core/testing';

import { BidManagementService } from './bid-management.service';

describe('BidManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BidManagementService]
    });
  });

  it('should be created', inject([BidManagementService], (service: BidManagementService) => {
    expect(service).toBeTruthy();
  }));
});
