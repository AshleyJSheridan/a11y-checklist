import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EnumHelper } from 'src/app/helpers/enum-helper';
import { GuidelineLevel } from 'src/app/enums/guideline-level.enum';

@Component({
	selector: 'app-check-desired-compliance-level',
	templateUrl: './check-desired-compliance-level.component.html',
	providers: [EnumHelper]
})
export class CheckDesiredComplianceLevelComponent implements OnInit {
	private _enumHelper: EnumHelper;
	currentLevel: GuidelineLevel = GuidelineLevel.AA;
	defaultLevel: string = GuidelineLevel[GuidelineLevel.AA];
	@Output() updateGuidelines: EventEmitter<boolean> = new EventEmitter<boolean>();

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
		
		this.updateGuidelines.emit(true);
	}
	
	getCurrentGuidelineLevel(): GuidelineLevel {
		return this.currentLevel;
	}
}
