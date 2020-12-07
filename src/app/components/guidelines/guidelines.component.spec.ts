import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GuidelinesComponent } from './guidelines.component';

describe('GuidelinesComponent', () => {
	let component: GuidelinesComponent;
	let fixture: ComponentFixture<GuidelinesComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ GuidelinesComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GuidelinesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
