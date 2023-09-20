import Menu from "../Menu";
import useAuth from "../../context/hooks/useAuth";
import { IHeaderProps } from "./utils/header.types";
import { BsCurrencyEuro } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = (props: IHeaderProps) => {
	const { isAuthenticated, user, logout } = useAuth();
	const navigate = useNavigate();

	return (
		<div
			className="w-full bg-black px-6 h-24 flex items-center justify-between"
			style={{ height: props.height }}
		>
			<div className={"flex justify-between items-center"}>
				<BsCurrencyEuro color="white" size={50} />
			</div>
			<Menu
				target={<FaUserCircle size={28} color="white" className="hover:opacity-70" />}
				classname={`cursor-pointer ${isAuthenticated ? "block" : "hidden"} md:hidden`}
			>
				<li className="px-4 py-2 hover:bg-gray-100" onClick={() => navigate("/profile")}>
					Profile
				</li>
				<li className="px-4 py-2 hover:bg-gray-100" onClick={logout}>
					Logout
				</li>
			</Menu>
			{user.username && (
				<span className="hidden lg:block text-white">Hello, {user.username}</span>
			)}
		</div>
	);
};
export default Header;
