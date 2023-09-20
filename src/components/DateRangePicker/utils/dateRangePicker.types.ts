interface IDatePickerValue {
	startDate: Date | null;
	endDate: Date | null;
}

export interface IDatePicker {
	startDateName: string;
	endDateName: string;
	value?: IDatePickerValue;
	disabled?: boolean;
	error?: string;
	onChange?: (event: any) => void;
}
