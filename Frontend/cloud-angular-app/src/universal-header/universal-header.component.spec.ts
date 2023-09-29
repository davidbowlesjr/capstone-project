import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalHeaderComponent } from './universal-header.component';

describe('UniversalHeaderComponent', () => {
  let component: UniversalHeaderComponent;
  let fixture: ComponentFixture<UniversalHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversalHeaderComponent]
    });
    fixture = TestBed.createComponent(UniversalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
