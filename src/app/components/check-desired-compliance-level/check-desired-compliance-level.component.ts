import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EnumHelper } from '../../helpers/enum-helper';
import { GuidelineLevel } from '../../enums/guideline-level.enum';

@Component({
	selector: 'app-check-desired-compliance-level',
	templateUrl: './check-desired-compliance-level.component.html',
	providers: [EnumHelper]
})
export class CheckDesiredComplianceLevelComponent implements OnInit {
	private _enumHelper: EnumHelper;
	currentLevel: GuidelineLevel = GuidelineLevel.AA;
	defaultLevel: string = GuidelineLevel[GuidelineLevel.AA];
	@Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(enumHelper: EnumHelper) {
		this._enumHelper = enumHelper;
	 }

	ngOnInit() { 
	}

	getAllGuidelineLevels(): string[] {
		let levels = this._enumHelper.getStringValuesFromEnum(GuidelineLevel);
		
		return levels;
	}
	
	toggleSelectedComplianceLevel($event: any, level: string): void {
		this.currentLevel = GuidelineLevel[level];
	}
	
	getCurrentGuidelineLevel(): GuidelineLevel {
		return this.currentLevel;
	}
	
	next(): void {
		this.nextStep.emit(true);
	}
	
	setComplianceLevelFromInt(complianceLevel: number): void {
		this.currentLevel = complianceLevel;
	}
	
	isComplianceLevelChecked(level: string) {
		return GuidelineLevel[level] == this.currentLevel
	}
}
