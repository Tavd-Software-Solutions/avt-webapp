import Button from "../../../components/Button";
import InputValue from "../../../components/InputValue/InputValue";
import Select from "../../../components/Select/Select";
import TextField from "../../../components/TextField";
import { useRevenuesFormController } from "./hooks/useRevenuesFormController";
import { IRevenuesForm } from "./utils/revenuesForm.types";

const RevenuesForm = (props: IRevenuesForm) => {
	const { revenue, title, navigate, tags, sources, payMethods, typeRevenues } =
		useRevenuesFormController(props);

	return (
		<div className="w-full md:h-max h-4/5 flex flex-col items-center mt-12 overflow-auto">
			<h1 className="block mb-8 text-3xl">{title}</h1>
			<form
				onSubmit={revenue.handleSubmit}
				className="w-10/12 flex flex-col gap-5 md:w-2/3"
			>
				<div className="flex flex-col md:flex-row gap-4">
					<TextField
						class="md:w-1/2"
						type={"text"}
						name={"name"}
						placeholder={"Name"}
						value={revenue.values.name}
						onChange={revenue.handleChange}
						error={revenue.errors.name}
						disabled={props.type === "VIEW"}
					/>

					<InputValue
						class="md:w-1/2"
						nameInput={"value"}
						placeholder={"Value"}
						name={revenue.values.coin}
						valueInput={revenue.values.value}
						onChange={revenue.handleChange}
						error={revenue.errors.value}
						disabled={props.type === "VIEW"}
					/>
				</div>
				<div className="flex flex-col md:flex-row gap-4">
					<Select
						name={"sourceId"}
						optionDefault={"Source"}
						options={sources}
						value={revenue.values.sourceId || ""}
						onChange={revenue.handleChange}
						error={revenue.errors.sourceId}
						disabled={props.type === "VIEW"}
					/>
					<Select
						name={"tagId"}
						optionDefault={"Tag"}
						options={tags}
						value={revenue.values.tagId || ""}
						onChange={revenue.handleChange}
						error={revenue.errors.tagId}
						disabled={props.type === "VIEW"}
					/>
				</div>
				<div className="flex flex-col md:flex-row gap-4">
					<Select
						name={"payMethod"}
						optionDefault={"Pay Method"}
						options={payMethods}
						value={revenue.values.payMethod || ""}
						onChange={revenue.handleChange}
						error={revenue.errors.payMethod}
						disabled={props.type === "VIEW"}
					/>
					<Select
						name={"typeRevenue"}
						optionDefault={"Type Revenue"}
						options={typeRevenues}
						value={revenue.values.typeRevenue || ""}
						onChange={revenue.handleChange}
						error={revenue.errors.typeRevenue}
						disabled={props.type === "VIEW"}
					/>
				</div>
				<div className="w-100">
					<TextField
						type={"date"}
						name={"date"}
						placeholder={"Date"}
						value={revenue.values.date || ""}
						onChange={revenue.handleChange}
						error={revenue.errors.date}
						disabled={props.type === "VIEW"}
					/>
				</div>
				<TextField
					height={100}
					type={"textarea"}
					name={"description"}
					placeholder="Description"
					value={revenue.values.description}
					onChange={revenue.handleChange}
					error={revenue.errors.description}
					disabled={props.type === "VIEW"}
				/>
				<div className="w-100 flex justify-between items-center mt-8 mb-10">
					<Button
						width={"40%"}
						height={"35px"}
						textsize={"16px"}
						type={"button"}
						outlined
						onClick={() => navigate(-1)}
					>
						{props.type !== "VIEW" ? "Cancel" : "Back"}
					</Button>
					<Button
						width={"40%"}
						height={"35px"}
						textsize={"16px"}
						type={"submit"}
						disabled={props.type === "VIEW"}
					>
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export default RevenuesForm;
