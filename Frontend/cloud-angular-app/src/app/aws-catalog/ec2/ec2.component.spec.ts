import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2Component } from './ec2.component';

describe('Ec2Component', () => {
  let component: Ec2Component;
  let fixture: ComponentFixture<Ec2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Ec2Component]
    });
    fixture = TestBed.createComponent(Ec2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
