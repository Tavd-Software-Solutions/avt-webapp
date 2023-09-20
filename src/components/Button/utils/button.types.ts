import { ReactNode } from "react";

export interface IButtonProps {
	classname?: string | undefined;
	children: ReactNode;
	type: "submit" | "reset" | "button" | undefined;
	disabled?: boolean;
	width?: string;
	height?: string;
	textsize?: string;
	outlined?: boolean;
	spacing?: number | string;
	style?: React.CSSProperties;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
