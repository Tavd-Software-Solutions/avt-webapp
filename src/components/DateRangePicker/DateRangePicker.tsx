import { FC, useMemo } from "react";
import { IDatePicker } from "./utils/dateRangePicker.types";
import TextField from "../TextField";

const DatePicker: FC<IDatePicker> = (props: IDatePicker) => {
	const error = useMemo(() => {
		if (props.value?.startDate && props.value.endDate) {
			return props.value?.startDate > props.value?.endDate
				? "The end date cannot be greater than the start date"
				: "";
		}
	}, [props.value?.startDate, props.value?.endDate]);

	return (
		<div className="w-full h-full flex flex-col">
			<div className="w-full flex gap-2 flex-wrap lg:flex-nowrap">
				<TextField
					type={"date"}
					name={props.startDateName}
					label={"From"}
					value={props.value?.startDate || ""}
					onChange={props.onChange}
					error={props.error || error}
				/>
				<TextField
					type={"date"}
					name={props.endDateName}
					label={"To"}
					value={props.value?.endDate || ""}
					onChange={props.onChange}
					error={props.error}
				/>
			</div>
			{props.error && (
				<p className="mt-1 text-sm text-red-600 dark:text-red-500 font-medium">
					{props.error}
				</p>
			)}
		</div>
	);
};
export default DatePicker;
