import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesComponent } from './ses.component';

describe('S3Component', () => {
  let component: SesComponent;
  let fixture: ComponentFixture<SesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SesComponent]
    });
    fixture = TestBed.createComponent(SesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});