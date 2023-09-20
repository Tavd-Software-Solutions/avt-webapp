import { useEffect, useRef, useState } from "react";
import { IMenuProps } from "./utils/menu.types";

// eslint-disable-next-line react/prop-types
const Menu: React.FC<IMenuProps> = ({ target, children, classname }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const calculateMenuPosition = () => {
		if (!menuRef.current) return;

		const targetRect = menuRef.current.getBoundingClientRect();
		const { innerHeight, innerWidth } = window;

		const topSpace = targetRect.top;
		const bottomSpace = innerHeight - targetRect.bottom;
		const leftSpace = targetRect.left;
		const rightSpace = innerWidth - targetRect.right;

		const shouldOpenDown = bottomSpace >= topSpace;
		const shouldOpenRight = rightSpace >= leftSpace;

		const top = shouldOpenDown ? targetRect.bottom : "auto";
		const bottom = shouldOpenDown ? "auto" : innerHeight - targetRect.top;
		const left = shouldOpenRight ? targetRect.left : "auto";
		const right = shouldOpenRight ? "auto" : innerWidth - targetRect.right;

		return { top, bottom, left, right };
	};

	return (
		<div className={`relative ${classname}`} ref={menuRef}>
			<div onClick={handleToggle} className="h-full lg:h-auto" ref={menuRef}>
				{target}
			</div>
			{isOpen && (
				<div
					className="w-3/5 md:w-auto fixed z-10 bg-white rounded shadow-lg"
					style={calculateMenuPosition()}
				>
					<ul className="py-2 px-4 lg:px-2">{children}</ul>
				</div>
			)}
		</div>
	);
};

export default Menu;
