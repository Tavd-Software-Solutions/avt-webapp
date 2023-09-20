import Button from "../../../components/Button";
import { AiOutlineFilter, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router";
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import List from "../../../components/List";
import { IColumn } from "../../../components/List/utils/list.types";
import { IRevenue, TypeRevenue } from "../../../types/Interfaces.type";
import { useRevenueList } from "./hooks/useRevenueList";
import useWindowSize from "../../../hooks/useWindowsSize";
import Menu from "../../../components/Menu/Menu";
import SideNav from "../../../components/SideNavFilter";
import useBoolean from "../../../hooks/useBoolean";

const RevenueList = () => {
	const navigate = useNavigate();
	const { width } = useWindowSize();
	const {
		list,
		changePage,
		deleteRevenue,
		amount,
		loading,
		setListFiltered,
		clearFilter,
	} = useRevenueList();
	const [bool, { setTrue, setFalse }] = useBoolean(false);

	const columns: IColumn<IRevenue>[] = [
		{
			minSize: 80,
			maxSize: 250,
			name: "name",
			type: "text",
			bold: true,
		},
		{
			minSize: 90,
			maxSize: 150,
			name: "value",
			type: "currency",
			bold: true,
			onRender: (item) => (
				<p className="truncate ">
					{`${item.typeRevenue === TypeRevenue.EXPENSE ? "-" : "+"} ${Number(
						item.value,
					).toLocaleString("pt-br", {
						style: "currency",
						currency: item.coin || "BRL",
					})}
					`}
				</p>
			),
		},
		{
			minSize: 90,
			maxSize: 200,
			name: "tag",
			align: "center",
			classname: "hidden lg:flex",
			onRender: (item) => (
				<div className="w-3/4 bg-black text-white font-bold text-sm rounded-lg p-1 px-4 hidden justify-center md:flex">
					<p className="truncate">{item.tag?.name}</p>
				</div>
			),
		},
		{
			minSize: 15,
			align: "center",
			name: "actions",
			onRender: (item) => (
				<div className="flex gap-6">
					<BsTrash
						className="hidden lg:block hover:opacity-80 hover:text-red-500 cursor-pointe z-10"
						onClick={(event) => {
							event.stopPropagation();
							deleteRevenue.mutate(item.id);
						}}
					/>
					<Menu
						target={<AiOutlineRight className="lg:hidden cursor-pointer" />}
						classname="lg:hidden"
					>
						<li
							className="px-4 py-2 hover:bg-gray-100"
							onClick={() => {
								navigate(`/revenue/form/${item.id}`);
							}}
						>
							View
						</li>
						<li
							className="px-4 py-2 hover:bg-gray-100"
							onClick={() => {
								navigate(`/revenue/form/edit/${item.id}`);
							}}
						>
							Edit
						</li>
						<li
							className="px-4 py-2 hover:bg-gray-100"
							onClick={() => {
								deleteRevenue.mutate(item.id);
							}}
						>
							Delete
						</li>
					</Menu>

					<MdEdit
						className="hidden lg:block hover:opacity-80 hover:text-gray-800 cursor-pointer z-10"
						onClick={(event) => {
							event.stopPropagation();
							navigate(`/revenue/form/edit/${item.id}`);
						}}
					/>
				</div>
			),
		},
	];

	return (
		<>
			<SideNav
				isOpen={bool}
				setIsFalse={setFalse}
				setWhere={setListFiltered}
				clearFilter={clearFilter}
			/>
			<main className="w-full flex flex-1 md:h-full flex-col items-center gap-y-4 pb-4 md:gap-y-8">
				<div className="w-full flex flex-col bg-black md:bg-white justify-center items-center">
					<div className="w-3/5 flex flex-col md:items-start md:border-2 border-black md:rounded-2xl gap-y-4 py-4 px-8 md:px-10 md:mt-8">
						<p className="text-gray-50 md:text-black">Amount: </p>
						<h1
							className={`font-bold text-3xl ${
								amount && amount < 0 ? "text-red-500" : "text-gray-50 md:text-black"
							}`}
						>
							{amount?.toLocaleString("pt-br", {
								style: "currency",
								currency: "BRL",
							})}
						</h1>
					</div>
				</div>

				<div className="flex flex-col w-4/5 h-3/5 md:w-3/5 gap-4">
					<div className="w-full flex gap-4 justify-end">
						<AiOutlineFilter
							className="block"
							onClick={() => setTrue()}
							cursor={"pointer"}
							color="black"
							size={30}
						/>
					</div>
					<List
						columns={columns}
						items={list || []}
						isTitle={false}
						pointer
						loading={loading}
						emptyMessage={"No revenues registered yet"}
						isScreenSmall={width >= 1024}
						onClick={(index) => navigate(`/revenue/form/${index}`)}
						onChangePage={() => changePage()}
					/>
				</div>

				<div className="w-full md:flex justify-center items-center hidden">
					<div className="w-3/5">
						<Button type={"button"} onClick={() => navigate("/revenue/form/new")}>
							+ Expenses
						</Button>
					</div>
				</div>
			</main>
		</>
	);
};
export default RevenueList;
