import { FC, useState } from "react";
import Menu from "../Menu";
import Header from "../Header";
import SideBar from "../SideBar/SideBar";
import useAuth from "../../context/hooks/useAuth";
import SideBarItem from "../SideBar/components/SideBarItem/SideBarItem";
import { HiHome } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import { BsThreeDots } from "react-icons/bs";
import { ISideBarItem } from "../SideBar/utils/sideBar.types";
import { FaList, FaUserCircle } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MODALTYPE } from "../../types/Interfaces.type";
import GenericModal from "../../pages/genericModal/GenericModal";
import useBoolean from "../../hooks/useBoolean";

const Layout: FC = () => {
	const { logout } = useAuth();
	const [bool, { setTrue, setFalse }] = useBoolean(false);

	const location = useLocation();
	const navigate = useNavigate();

	const [typeModal, setTypeModal] = useState<MODALTYPE | null>(null);

	const sideBarItems: ISideBarItem[] = [
		{
			text: "Home",
			icon: <HiHome size={26} />,
			selected: location.pathname === "/revenue",
			onClick: () => navigate("/revenue"),
		},
		{
			text: "Extracts",
			icon: <FaList size={24} />,
			selected: location.pathname === "/extracts",
			onClick: () => navigate("/extracts"),
		},
		{
			text: "",
			icon: <IoMdAdd color="white" size={40} />,
			classname:
				"lg:hidden absolute bottom-14 p-2 rounded-full bg-black transition ease-in-out delay-150 hover:border-none hover:scale-125",
			onClick: () => navigate("/revenue/form/NEW"),
		},
		{
			text: "Metrics",
			icon: <VscGraph size={24} />,
			selected: location.pathname === "/metrics",
			onClick: () => navigate("/metrics"),
		},
		{
			text: "More",
			classname: "self-center",
			onRender: (index) => (
				<Menu
					key={index}
					target={
						<SideBarItem
							text="More"
							icon={<BsThreeDots size={28} />}
							classname="h-full lg:h-auto"
						/>
					}
				>
					<li
						className="px-4 py-2 hover:bg-gray-100"
						onClick={() => {
							setTypeModal("sources");
							setTrue();
						}}
					>
						Sources
					</li>
					<li
						className="px-4 py-2 hover:bg-gray-100"
						onClick={() => {
							setTypeModal("tags");
							setTrue();
						}}
					>
						Tags
					</li>
				</Menu>
			),
		},
		{
			text: "User",
			onRender: (index) => (
				<Menu
					key={index}
					target={
						<SideBarItem
							text="User"
							icon={<FaUserCircle size={28} />}
							classname="h-full lg:h-auto"
						/>
					}
					classname="h-full flex items-center hidden lg:block lg:h-auto lg:absolute lg:bottom-0"
				>
					<li
						className="px-4 py-2 hover:bg-gray-100"
						onClick={() => navigate("/profile")}
					>
						Profile
					</li>
					<li className="px-4 py-2 hover:bg-gray-100" onClick={logout}>
						Logout
					</li>
				</Menu>
			),
		},
	];

	return (
		<div className="w-screen h-screen flex flex-col flex-1">
			<Header />
			<div className="flex flex-row flex-1 overflow-auto max-h-fit-content">
				<SideBar items={sideBarItems} />
				<Outlet />
				<GenericModal open={bool} setFalse={setFalse} type={typeModal} />
			</div>
		</div>
	);
};

export default Layout;
