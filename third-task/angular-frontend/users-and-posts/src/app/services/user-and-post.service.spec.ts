import { TestBed } from '@angular/core/testing';

import { UserAndPostService } from './user-and-post.service';

describe('UserAndPostService', () => {
  let service: UserAndPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAndPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
