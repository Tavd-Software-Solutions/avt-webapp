export interface IInputValueProps {
	nameInput?: string;
	valueInput?: number;
	placeholder?: string;
	disabled?: boolean;
	class?: string;
	style?: React.CSSProperties | undefined;
	error?: string;
	name?: string;
	onChange?: (event: any) => void;
}
