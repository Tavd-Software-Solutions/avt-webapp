import { IInputValueProps } from "./utils/inputValue.types";

const InputValue = (props: IInputValueProps) => {
	return (
		<div className={`w-full flex-col ${props.class}`}>
			<div className={`w-full flex relative mt-1`}>
				<div
					className="w-24 h-full flex items-center justify-center absolute bg-gray-900 text-gray-50
						outline-none border-none text-center rounded-lg disabled:bg-gray-450"
				>
					{props.name}
				</div>
				<input
					step="0.01"
					min={0}
					type="number"
					disabled={props.disabled}
					name={props.nameInput}
					value={props.valueInput || ""}
					placeholder={props.placeholder}
					onChange={props.onChange}
					className={`w-full h-10 block text-sm border-2 rounded-lg ps-28
						disabled:bg-gray-300 disabled:border-gray-400 appearance-none
						focus:outline-none focus:ring-0.2 focus:ring-offset-0.5
						[-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 
						[&::-webkit-outer-spin-button]:appearance-none 
						[&::-webkit-inner-spin-button]:m-0 
						[&::-webkit-inner-spin-button]:appearance-none
						${
							props.error
								? "border-red-500 focus:border-red-500 focus:ring-red-500"
								: "border-gray-900 focus:border-gray-900 focus:ring-gray-900"
						}`}
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

export default InputValue;
