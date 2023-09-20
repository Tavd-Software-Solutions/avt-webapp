import { ReactNode } from "react";

export interface IModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	width?: string;
	height?: string;
	children?: ReactNode;
}
