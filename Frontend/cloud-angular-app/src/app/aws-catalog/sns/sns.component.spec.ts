import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SNSComponent } from './sns.component';

describe('SnsComponent', () => {
  let component: SNSComponent;
  let fixture: ComponentFixture<SNSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SNSComponent]
    });
    fixture = TestBed.createComponent(SNSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
