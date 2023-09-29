import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EstimateComponent } from './estimate.component';
import { estimateUSDPipe } from '../pipes/estimateUSD.pipe';
 
describe('EstimateComponent', () => {
    let component: EstimateComponent;
    let fixture: ComponentFixture<EstimateComponent>;
 
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EstimateComponent, estimateUSDPipe]
        }).compileComponents();
 
        fixture = TestBed.createComponent(EstimateComponent);
        component = fixture.componentInstance;
    });
    // 1. Creating the component
    it('should create the estimate component', () => {
        expect(component).toBeTruthy();
    });
    // 2. Calculate the costs
    it('should correctly calculate the costs', () => {
        component.services = [
            { name: "EC2", upfrontCost: "1,000 USD", monthlyCost: "100 USD", annualCost: "1,200 USD" },
            { name: "DynamoDB", upfrontCost: "500 USD", monthlyCost: "50 USD", annualCost: "600 USD" }
        ];
        
        expect(component.upfront).toEqual(1500);
        expect(component.monthly).toEqual(150);
        expect(component.annual).toEqual(1800);
    });
    // 3. Display the costs
    it('should display costs in the template', () => {
        component.services = [
            { name: "EC2", upfrontCost: "1,000 USD", monthlyCost: "100 USD", annualCost: "1,200 USD" }
        ];
       
        fixture.detectChanges();
 
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.estimate-table td:nth-child(1)').textContent).toContain('1,000');
        expect(compiled.querySelector('.estimate-table td:nth-child(2)').textContent).toContain('100');
        expect(compiled.querySelector('.estimate-table td:nth-child(3)').textContent).toContain('1,200');
    });
    // 4. Inserting into table (will change)
    it('should accept input for services', () => {
        component.services = [
            { name: "Elasticache", upfrontCost: "2,000 USD", monthlyCost: "200 USD", annualCost: "2,400 USD" }
        ];
        expect(component.services[0].upfrontCost).toEqual("2,000 USD");
    });
    // 5. Handling empty services
    it('should handle empty services array', () => {
        component.services = [];
        
        expect(component.upfront).toEqual(0);
        expect(component.monthly).toEqual(0);
        expect(component.annual).toEqual(0);
    });
});