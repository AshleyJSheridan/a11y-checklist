import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CheckComponent } from './components/check/check.component';
import { CheckContentTypesComponent } from './components/check-content-types/check-content-types.component';
import { CheckDesiredComplianceLevelComponent } from './components/check-desired-compliance-level/check-desired-compliance-level.component';

describe('AppComponent', () => {
	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ AppComponent, CheckComponent, CheckContentTypesComponent, CheckDesiredComplianceLevelComponent ],
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'a11y-checklist'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('a11y-checklist');
	});
});
