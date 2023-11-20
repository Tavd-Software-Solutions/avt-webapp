import { useState } from "react";
import { IDropdownProps } from "./utils/dropdown.types";
import { BsChevronDown } from "react-icons/bs";

const Dropdown = (props: IDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={"flex flex-col w-full"}>
			<button
				onClick={() => handleOpenDropdown()}
				className={`w-full flex justify-between items-center py-2 px-2 border-black text-sm border-2 rounded-lg
					focus:outline-none focus:ring-0.2 focus:ring-offset-0.5`}
			>
				{props.name}
				<BsChevronDown />
			</button>

			{isOpen && (
				<ul className="w-full px-2 py-2 text-sm border-2 rounded-lg mt-1">
					{props.options.map((option, index) => (
						<label className="flex items-center gap-1" key={index}>
							<input
								type="checkbox"
								className="border-1 rounded checked:bg-black"
								name="checked"
								// checked={props.value.indexOf(option.data) > -1}
								value={option.data}
								onChange={props.onChange}
							/>
							<li className="py-1 px-1 bg-white cursor-pointer">{option.name}</li>
						</label>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
