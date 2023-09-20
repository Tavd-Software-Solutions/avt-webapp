import { ISelectOption } from "../../../types/Interfaces.type";

export interface ISelectProps {
	options: ISelectOption[] | [];
	name?: string;
	value?: any;
	disabled?: boolean;
	multiple?: boolean;
	required?: boolean;
	removeDefaultOption?: boolean;
	optionDefault?: string;
	class?: string;
	style?: React.CSSProperties | undefined;
	error?: string;
	label?: string;
	onChange?: (event: any) => void;
}
