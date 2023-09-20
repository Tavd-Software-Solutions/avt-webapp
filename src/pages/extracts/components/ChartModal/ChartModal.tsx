import Button from "../../../../components/Button";
import DatePicker from "../../../../components/DateRangePicker";
import Modal from "../../../../components/Modal";
import Select from "../../../../components/Select";
import TextField from "../../../../components/TextField";
import { ChartType } from "../../../../types/Interfaces.type";
import { useChartModal } from "./hooks/useChartModal";
import { IChartModal } from "./utils/chartModal.types";

export const ChartModal = (props: IChartModal) => {
	const { newChart, tags, chartTypes, payMethods, typeRevenues } = useChartModal(props);

	return (
		<Modal
			open={props.open}
			onClose={() => {
				props.setFalse();
				newChart.setValues(newChart.initialValues);
				newChart.setErrors({});
			}}
			title="Charts"
		>
			<form
				className="w-full h-96 lg:h-auto flex flex-col justify-start items-start gap-6 p-2 overflow-auto"
				onSubmit={newChart.handleSubmit}
			>
				<TextField
					type={"text"}
					name={"title"}
					label={"Title"}
					value={newChart.values.title}
					onChange={newChart.handleChange}
				/>
				<Select
					name={"type"}
					label={"Chart Type"}
					optionDefault={"Chart Type"}
					options={chartTypes}
					value={newChart.values.type || ""}
					onChange={newChart.handleChange}
					error={newChart.errors.type}
				/>
				{Number(newChart.values.type) === ChartType.BAR && (
					<>
						<Select
							name={"typeRevenue"}
							optionDefault={"Type Revenue"}
							options={typeRevenues}
							value={newChart.values.typeRevenue || ""}
							onChange={newChart.handleChange}
							error={newChart.errors.typeRevenue}
						/>
						<div className="w-full flex flex-col md:flex-row gap-2">
							<Select
								name={"tagIds"}
								optionDefault={"Tag"}
								options={tags || []}
								value={newChart.values.tagIds || ""}
								onChange={newChart.handleChange}
								error={newChart.errors.tagIds}
							/>
							<Select
								name={"payMethods"}
								optionDefault={"Pay Method"}
								options={payMethods}
								value={newChart.values.payMethods || ""}
								onChange={newChart.handleChange}
								error={newChart.errors.payMethods}
							/>
						</div>
						<DatePicker
							startDateName={"startDate"}
							endDateName={"endDate"}
							onChange={newChart.handleChange}
							value={{
								startDate: newChart.values.startDate as Date,
								endDate: newChart.values.endDate as Date,
							}}
						/>
					</>
				)}
				<div className="w-full flex justify-between mt-auto">
					<Button
						width={"25%"}
						height={"35px"}
						textsize={"16px"}
						type={"button"}
						outlined
						onClick={() => props.setFalse()}
					>
						Cancel
					</Button>
					<Button width={"25%"} height={"35px"} textsize={"16px"} type={"submit"}>
						Apply
					</Button>
				</div>
			</form>
		</Modal>
	);
};
