import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CostEstimationComponent } from './cost-estimation-title.component';

describe('CostEstimationComponent', () => {
  let component: CostEstimationComponent;
  let fixture: ComponentFixture<CostEstimationComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostEstimationComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CostEstimationComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });
  // 1. Creating the component
  it('should create the cost-estimation title-component', () => {
    expect(component).toBeTruthy();
  });


  // 2. Styles for h1 tag (including font)
  it('should apply correct styles to the h1 tag', () => {
    const h1 = element.querySelector('h1');
    if (h1){
    const styles = window.getComputedStyle(h1);
    expect(styles.padding).toBe('10px');
    expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(styles.fontFamily).toBe('Verdana, Geneva, Tahoma, sans-serif');
  }
  });

  // 3. Styles for h1 tag (including font)
  it('should apply correct styles to the p tag', () => {
    const p = element.querySelector('p');
    if (p){
    const styles = window.getComputedStyle(p);
    expect(styles.padding).toBe('10px');
    expect(styles.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(styles.fontFamily).toBe('Verdana, Geneva, Tahoma, sans-serif');
    }
  });
});
