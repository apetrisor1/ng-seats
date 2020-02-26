import { TestBed } from '@angular/core/testing';

import { SVGServiceService } from './svgservice.service';

describe('SVGServiceService', () => {
  let service: SVGServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SVGServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
