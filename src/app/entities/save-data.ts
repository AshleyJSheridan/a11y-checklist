export class SaveData {
	public contentTypes: number[] = [];
	public complianceLevel: number = 1;
	public checkedGuidelines: string[] = [];

	constructor(contentTypes: number[], complianceLevel: number, checkedGuidelines: string[]) {
		this.contentTypes = contentTypes;
		this.complianceLevel = complianceLevel;
		this.checkedGuidelines = checkedGuidelines;
	}
}
