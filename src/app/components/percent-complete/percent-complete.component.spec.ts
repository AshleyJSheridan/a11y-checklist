import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PercentCompleteComponent } from './percent-complete.component';

describe('PercentCompleteComponent', () => {
	let component: PercentCompleteComponent;
	let fixture: ComponentFixture<PercentCompleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ PercentCompleteComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PercentCompleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('should return 0 if there are no guidelines', () => {
		component.total = 0;
		
		expect(component.getPercentCompleted()).toEqual(0);
	});
	
	it('should return 0 if there are no checked guidelines', () => {
		component.total = 0;
		component.complete = 0;
		
		expect(component.getPercentCompleted()).toEqual(0);
	});
	
	it('should return the correct percentage of checked guidelines out of the total number of guidelines, to 2 decimal places', () => {
		component.total = 10;
		component.complete = 6;
		
		expect(component.getPercentCompleted()).toEqual(60);
	});
	
	it('should return the circumference of the chart based on the chart size', () => {
		component.chartRadius = 10;
		
		expect(component.getChartCircumference()).toBeCloseTo(62.8, 1)
		
		component.chartRadius = 30;
		
		expect(component.getChartCircumference()).toBeCloseTo(188.496, 3)
	});
	
	it('should return the complete percentage of the calculated circumference', () => {
		spyOn(component, 'getChartCircumference').and.returnValue(200);
		spyOn(component, 'getPercentCompleted').and.returnValue(50);
		
		expect(component.getChartCompletePartialCircumference()).toEqual(100);
	});
	
	it('should return the dash array CSS value as a string', () => {
		spyOn(component, 'getChartCircumference').and.returnValue(200);
		spyOn(component, 'getChartCompletePartialCircumference').and.returnValue(50);
		
		expect(component.getDashArray()).toEqual('50 200');
	});
});
