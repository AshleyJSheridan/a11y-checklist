import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChecklistService } from '../../services/checklist.service';
import { Guidelines } from '../../entities/guidelines';
import { CheckContentTypesComponent } from '../check-content-types/check-content-types.component';
import { ContentType } from '../../enums/content-type.enum';
import { GuidelinesComponent } from '../guidelines/guidelines.component';
import { GuidelineLevel } from '../../enums/guideline-level.enum';
import { CheckDesiredComplianceLevelComponent } from '../check-desired-compliance-level/check-desired-compliance-level.component';
import { Guideline } from '../../entities/guideline';
import { SaveStateService } from '../../services/save-state.service';
import { LocalStorageHelper} from '../../helpers/local-storage-helper';
import { NotificationComponent } from '../notification/notification.component';
import { ConfirmComponent } from '../prompts/confirm/confirm.component';
import {ConfirmModalOptions} from "../../entities/confirm-modal-options";

@Component({
	selector: 'app-check',
	templateUrl: './check.component.html',
	providers: [LocalStorageHelper, SaveStateService]
})
export class CheckComponent implements OnInit {
	private _showResults: boolean = false;
	private saveStateService;
	currentStep: number = 1;
	totalSteps: number = 3;
	@ViewChild(CheckContentTypesComponent, { static: true }) checkContentTypeComponent;
	@ViewChild(CheckDesiredComplianceLevelComponent, { static: true }) checkDesiredComplianceLevelComponent;
	@ViewChild(GuidelinesComponent) guidelinesComponent;
	@ViewChild(NotificationComponent) notificationComponent;
	@ViewChild(ConfirmComponent) confirmComponent;

	constructor(saveStateService: SaveStateService) {
		this.saveStateService = saveStateService;
	}

	ngOnInit() {
	}

	getSelectedContentTypes(): ContentType[] {
		return this.checkContentTypeComponent.getSelectedContentTypes();
	}

	getSelectedGuidelineLevel(): GuidelineLevel {
		return this.checkDesiredComplianceLevelComponent.getCurrentGuidelineLevel();
	}

	updateGuidelines(): void {
		let self = this;

		window.setTimeout(function(){
			self.guidelinesComponent.updateGuidelines();
		}, 0);
	}

	nextStep(event: any): void {
		this.currentStep ++;

		if (this.canShowResults()) {
			this.updateGuidelines();
		}
	}

	canShowResults(): boolean {
		return this.currentStep === this.totalSteps;
	}

	canShowStep(step: number): boolean {
		return this.currentStep === step;
	}

	getStepsAsArray(): number[] {
		return Array.from({length: 3}, (_, index) => index + 1);
	}

	goBackToStep(step, event: any) {
		event.preventDefault();

		this.currentStep = step;
	}

	saveState(event: any): void {
		const saveSuccess = this.saveStateService.saveState(this.getSelectedContentTypes(), this.getSelectedGuidelineLevel(), this.getCheckedGuidelines());
		let notificationType;
		let message;

		if(saveSuccess) {
			notificationType = 'success';
			message = 'Save complete';
		} else {
			notificationType = 'error';
			message = 'There was a problem saving your current state';
		}
		this.showNotification(notificationType, message);
	}

	getCheckedGuidelines(): Guideline[] {
		return this.guidelinesComponent.getCheckedGuidelines();
	}

	showNotification(notificationType: string, message: string): void {
		this.notificationComponent.showNotification(notificationType, message);
	}

	loadState(event: any): void {
		const focusTarget = event.currentTarget;
		const confirmOptions = new ConfirmModalOptions(
			'Load Saved Checklist',
			'Your current checklist settings will be lost when saved settings are loaded in. Do you wish to continue?',
			focusTarget,
			'load-confirm'
		);
		this.confirmComponent.showConfirmation(confirmOptions);
	}

	loadStateConfirm(event: any): void {
		let hasSavedState = this.saveStateService.hasSavedState();

		if(!hasSavedState) {
			this.notificationComponent.showNotification('warn', 'No saved state to load');
		} else {
			let savedState = this.saveStateService.getSavedState();

			this.checkContentTypeComponent.setContentTypesFromArray(savedState.contentTypes);
			this.checkDesiredComplianceLevelComponent.setComplianceLevelFromInt(savedState.complianceLevel);
			this.guidelinesComponent.setCheckedGuidelines(savedState.checkedGuidelines, this.getSelectedContentTypes(), this.getSelectedGuidelineLevel());

			this.currentStep = this.totalSteps;
		}
	}

	confirmModalAction(details): void {
		if(details.userAction === true) {
			// dispatch to correct method
			if(details.modalType === 'load-confirm') {
				this.loadStateConfirm(details);
			}
		}
	}
}
