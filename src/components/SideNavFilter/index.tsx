import { Field } from "formik";
import Button from "../Button";
import DatePicker from "../DateRangePicker";
import Dropdown from "../Dropdown/Dropdown";
import Select from "../Select";
import TextField from "../TextField";
import { useFilterForm } from "./hooks/useFilterForm";
import { ISideNavProps } from "./utils/sideNav.types";
import { AiOutlineClear, AiOutlineClose } from "react-icons/ai";

const SideNav = (props: ISideNavProps) => {
	const { filter, payMethods, tags, typeRevenues, clearFilter } = useFilterForm(props);

	const handleChangeArray = (array: any[], value: any, name:string) => {
		if (array.includes(value)) {
			array.splice(array.indexOf(value), 1)
		} else {
			array.push(value)
		}
		filter.setFieldValue(name, array)
	}

	return (
		<div className="flex">
			<div
				className={`fixed right-0 top-0 h-full bg-white text-black-100 w-full md:w-2/5 
                            flex flex-col justify-between z-40 transform transition-all 
                            duration-300 ease-in-out
                             ${props.isOpen ? "translate-x-0" : "translate-x-full"}
                            `}
			>
				<div className="py-5 px-5">
					<div className="flex justify-between">
						<AiOutlineClose
							cursor={"pointer"}
							size={30}
							className="hover:opacity-80 hover:text-red-500"
							onClick={() => props.setIsFalse()}
						/>
						<AiOutlineClear
							cursor={"pointer"}
							size={30}
							className="hover:opacity-80 hover:text-gray-800"
							onClick={() => clearFilter()}
						/>
					</div>
					<form
						className="flex justify-center items-center mt-5"
						onSubmit={filter.handleSubmit}
					>
						<div className="flex flex-col items-center gap-2 w-3/5 md:w-full">
							<TextField
								type={"text"}
								name={"name"}
								placeholder={"Name"}
								value={filter.values.name}
								onChange={filter.handleChange}
							/>

							<TextField
								type={"number"}
								name={"value"}
								placeholder={"Value"}
								value={filter.values.value}
								onChange={filter.handleChange}
							/>

							<Dropdown
								name={"Tag"}
								options={tags}
								value={filter.values.tagId as []}
								onChange={(event: any) => handleChangeArray(filter.values.tagId as [], event.target.value, "tagId")}
							/>

							<Dropdown
								name={"Pay Method"}
								options={payMethods}
								onChange={(event) => handleChangeArray(filter.values.payMethod as [], event.target.value, "payMethod")}
								value={filter.values.payMethod as []}
							/>

							<Dropdown
								name={"Type Revenue"}
								options={typeRevenues}
								onChange={(event) => handleChangeArray(filter.values.typeRevenue as [], event.target.value, "typeRevenue")}
								value={filter.values.typeRevenue as []}
							/>

							<DatePicker
								startDateName={"startDate"}
								endDateName={"endDate"}
								onChange={filter.handleChange}
								value={{
									startDate: filter.values.startDate as Date,
									endDate: filter.values.endDate as Date,
								}}
							/>

							<div className="flex justify-center items-center mt-6 w-full lg:w-3/5">
								<Button height={"35px"} textsize={"16px"} type={"submit"}>
									Aplicar filtros
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SideNav;
