import SideBarItem from "./components/SideBarItem/SideBarItem";
import { ISideBarProps } from "./utils/sideBar.types";

const SideBar: React.FC<ISideBarProps> = (props: ISideBarProps) => {
	return (
		<div
			className="w-full h-20 fixed bottom-0 left-0 border-t-2 border-black 
				lg:w-72 lg:h-full lg:relative lg:border-0 bg-gray-100 flex flex-col gap-2 z-10"
		>
			<div className="flex lg:flex-col justify-between flex-grow">
				<div className="w-full justify-around flex lg:flex-col">
					{props.items.map((item, index) =>
						item.onRender ? (
							item.onRender(index)
						) : (
							<SideBarItem
								key={index}
								text={item.text}
								icon={item.icon}
								selected={item.selected}
								classname={item.classname}
								onClick={item.onClick}
							/>
						),
					)}
				</div>
			</div>
		</div>
	);
};

export default SideBar;
