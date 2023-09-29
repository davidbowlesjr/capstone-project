import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudwatchComponent } from './cloudwatch.component';
import { CloudWatchCloudFormationService } from './cloudformation.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CloudwatchComponent', () => {
  let component: CloudwatchComponent;
  let fixture: ComponentFixture<CloudwatchComponent>;
  //const testForm = jasmine.createSpyObj('FormGroup')

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, FormsModule],
      declarations: [CloudwatchComponent]
    });
    fixture = TestBed.createComponent(CloudwatchComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });

  //create component
  it('should create component', () => {
    expect(component).toBeTruthy();
});

  //check validity of form when empty
  it('form should be invalid when empty', () => {
    expect(component.cloudwatchForm.valid).toBeFalsy();
  });

  //success message flagged to false when component is created 
  it('should show a success message', () => {
    let message = component.showSuccessMessage
    expect(message).toBeFalsy();
  });

  //generate cloudformation
  it('should submit the form to generate template', () => {
    spyOn(component, 'onSubmit');
    let element = fixture.debugElement.query(By.css('button')).nativeElement;
    element.click();


    //component.onSubmit(component.cloudwatchForm);


    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  //check validity of form after being filled out
  it('form should be valid once filled out', () => {

    
    component.cloudwatchForm.controls['alarmName'].setValue("test");
    component.cloudwatchForm.controls['region'].setValue("US_EAST_1");
    component.cloudwatchForm.controls['comparisonOperator'].setValue("GreaterThanThreshold");
    component.cloudwatchForm.controls['numberOfBreaches'].setValue("1");
    component.cloudwatchForm.controls['numberOfMetrics'].setValue("1");
    component.cloudwatchForm.controls['standardResolution'].setValue("1");
    component.cloudwatchForm.controls['highResolution'].setValue("1");
    component.cloudwatchForm.controls['compositeAlarms'].setValue("1");
    component.cloudwatchForm.controls['evaluationPeriod'].setValue("60");
    component.cloudwatchForm.controls['threshold'].setValue("90");
    component.cloudwatchForm.controls['alarmAction'].setValue("arn:aws:sns:us-east-1:123456789012:MySNSTopic");

    expect(component.cloudwatchForm.valid).toBeTruthy();
  });

  //calculate cost
  it('should calculate cost for the service', () => {
   
    component.cloudwatchForm.controls['alarmName'].setValue("test");
    component.cloudwatchForm.controls['region'].setValue("US_EAST_1");
    component.cloudwatchForm.controls['comparisonOperator'].setValue("GreaterThanThreshold");
    component.cloudwatchForm.controls['numberOfBreaches'].setValue("1");
    let metrics = component.cloudwatchForm.controls['numberOfMetrics'].setValue("1");
    let standardResolution = component.cloudwatchForm.controls['standardResolution'].setValue("1");
    let highResolution = component.cloudwatchForm.controls['highResolution'].setValue("1");
    let compositeAlarms = component.cloudwatchForm.controls['compositeAlarms'].setValue("1");
    component.cloudwatchForm.controls['evaluationPeriod'].setValue("60");
    component.cloudwatchForm.controls['threshold'].setValue("90");
    component.cloudwatchForm.controls['alarmAction'].setValue("arn:aws:sns:us-east-1:123456789012:MySNSTopic");
    
    const metricsCost = metrics! * 0.30;
    const standardResolutionCost = standardResolution! * 0.10;
    const highResolutionCost = highResolution! * 0.30;
    const compositeAlarmsCost = compositeAlarms! * 0.50;

    // Assuming monthly for now. Adjust as needed.
    const totalMonthlyCost = metricsCost + standardResolutionCost + highResolutionCost + compositeAlarmsCost;
    
    const costs = component.calculateCost(component.cloudwatchForm)

    
    expect(costs.annual).toEqual(totalMonthlyCost * 12);
    expect(costs.monthly).toEqual(totalMonthlyCost);
    expect(costs.upfront).toEqual(0);

  });


});
