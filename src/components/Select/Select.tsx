import { ISelectProps } from "./utils/select.types";
import { ISelectOption } from "../../types/Interfaces.type";

const Select = (props: ISelectProps) => {
	const { removeDefaultOption = true } = props;

	return (
		<div className={"flex flex-col w-full"}>
			<label htmlFor={props.name} className="text-lg text-gray-900 font-bold mb-1 ">
				{props.label}
			</label>
			<select
				name={props.name}
				disabled={props.disabled}
				multiple={props.multiple}
				required={props.required}
				onChange={props.onChange}
				className={`w-full block text-sm border-2 rounded-lg
					disabled:bg-gray-300 disabled:border-gray-400 resize-none
					focus:outline-none focus:ring-0.2 focus:ring-offset-0.5
				${
					props.error
						? "border-red-500 focus:border-red-500 focus:ring-red-500"
						: "border-gray-900 focus:border-gray-900 focus:ring-gray-900"
				}`}
				value={props.value}
				defaultValue={props.value || ""}
			>
				{props.optionDefault ? (
					<option disabled={removeDefaultOption} hidden={removeDefaultOption} value={""}>
						{props.optionDefault}
					</option>
				) : null}
				{props.options?.map((item: ISelectOption, index) => (
					<option key={index} value={item.data}>
						{item.name}
					</option>
				))}
			</select>
			{props.error && (
				<p className="mt-1 text-sm text-red-600 dark:text-red-500 font-medium">
					{props.error}
				</p>
			)}
		</div>
	);
};

export default Select;
