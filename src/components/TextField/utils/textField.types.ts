import { HTMLInputTypeAttribute } from "react";

export interface ITextFieldProps {
	id?: string;
	type: HTMLInputTypeAttribute;
	name: string;
	value?: any;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
	width?: number;
	height?: number;
	class?: string;
	style?: React.CSSProperties | undefined;
	onChange?: (event: any) => void;
}
