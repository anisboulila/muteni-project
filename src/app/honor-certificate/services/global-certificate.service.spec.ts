import { TestBed } from '@angular/core/testing';

import { GlobalCertificateService } from './global-certificate.service';

describe('GlobalCertificateService', () => {
  let service: GlobalCertificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalCertificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
