import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamoComponent } from './dynamo.component';

describe('DynamoComponent', () => {
  let component: DynamoComponent;
  let fixture: ComponentFixture<DynamoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamoComponent]
    });
    fixture = TestBed.createComponent(DynamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
