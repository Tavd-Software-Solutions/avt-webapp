import { ISiderBarItemProps } from "./utils/sideBarItem.types";

const SideBarItem = (props: ISiderBarItemProps) => {
	return (
		<div
			className={`flex ${props.classname} ${
				props.selected && "lg:border-l-8 border-gray-800"
			} gap-0 items-center lg:py-8 lg:gap-12 cursor-pointer lg:pl-12 border-black 
				transition ease-out delay-150
				hover:border-b-4 lg:hover:border-b-0 lg:hover:border-l-8`}
			onClick={props.onClick}
		>
			{props.icon && <span>{props.icon}</span>}
			<span className="font-bold text-black text-xl hidden lg:block">{props.text}</span>
		</div>
	);
};

export default SideBarItem;
