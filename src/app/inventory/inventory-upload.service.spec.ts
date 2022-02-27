import { TestBed } from '@angular/core/testing';

import { InventoryUploadService } from './inventory-upload.service';

describe('InventoryUploadService', () => {
  let service: InventoryUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
