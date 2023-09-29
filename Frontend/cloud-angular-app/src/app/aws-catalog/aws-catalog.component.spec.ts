import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsCatalogComponent } from './aws-catalog.component';

describe('AwsCatalogComponent', () => {
  let component: AwsCatalogComponent;
  let fixture: ComponentFixture<AwsCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwsCatalogComponent]
    });
    fixture = TestBed.createComponent(AwsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
