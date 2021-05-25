import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
	let component: ToolbarComponent;
	let fixture: ComponentFixture<ToolbarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ToolbarComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit an event when the save button is pressed', () => {
		spyOn(component.saveState, 'emit');

		component.save();

		expect(component.saveState.emit).toHaveBeenCalledWith(true);
	});

	it('should emit an event when the load button is pressed', () => {
		spyOn(component.loadState, 'emit');

		component.load();

		expect(component.loadState.emit).toHaveBeenCalledWith(true);
	});
});
