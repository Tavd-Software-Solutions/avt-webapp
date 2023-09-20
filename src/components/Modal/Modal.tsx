import { useEffect, useRef } from "react";
import { IModalProps } from "./utils/modal.types";
import { IoMdClose } from "react-icons/io";

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const { open, onClose, title, width, height, children } = props;

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			onClose();
		}
	};

	const overlayClasses = `fixed top-0 left-0 w-full h-full bg-black ${
		open ? "opacity-50" : ""
	} z-50`;

	const modalClasses = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md z-50 md:w-1/2 w-11/12 max-w-md h-auto ${
		open ? "" : "hidden"
	}`;

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			{open && <div className={overlayClasses} />}
			<div
				ref={modalRef}
				className={modalClasses}
				style={{ width: width, height: height, maxWidth: "100vw" }}
			>
				<div className="flex justify-between items-center px-4 py-2 bg-gray-200 rounded-t-lg">
					{title && <h2 className="text-lg font-bold">{title}</h2>}
					<IoMdClose
						className="w-6 h-6 cursor-pointer hover:opacity-80"
						color="black"
						onClick={onClose}
					/>
				</div>
				<div className="p-4 h-full overflow-auto">{children}</div>
			</div>
		</>
	);
};

export default Modal;
