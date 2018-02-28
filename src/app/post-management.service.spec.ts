import { TestBed, inject } from '@angular/core/testing';

import { PostManagementService } from './post-management.service';

describe('PostManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostManagementService]
    });
  });

  it('should be created', inject([PostManagementService], (service: PostManagementService) => {
    expect(service).toBeTruthy();
  }));
});
