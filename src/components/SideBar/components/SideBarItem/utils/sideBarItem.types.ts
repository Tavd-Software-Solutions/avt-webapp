export interface ISiderBarItemProps {
	text: string;
	icon?: JSX.Element;
	selected?: boolean;
	classname?: string;
	onClick?: () => void;
}
