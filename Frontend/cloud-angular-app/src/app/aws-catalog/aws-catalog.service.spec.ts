import { TestBed } from '@angular/core/testing';

//import AwsCatalogService from './service/aws-catalog.service';
import { AwsCatalogService } from './service/aws-catalog.service';

describe('AwsCatalogService', () => {
  let service: AwsCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
