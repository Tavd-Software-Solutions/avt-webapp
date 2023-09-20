import { ITextFieldProps } from "./utils/textField.types";

const TextField = (props: ITextFieldProps) => {
	const typeInput = props.type !== "textarea";

	return (
		<div
			className={`flex flex-col ${!props.width && !props.class && "w-full"} ${
				props.class
			}`}
			style={{ width: props.width }}
		>
			<label htmlFor={props.name} className="text-lg text-gray-900 font-bold mb-1 ">
				{props.label}
			</label>
			{props.type === "textarea" && (
				<textarea
					id={props.id}
					name={props.name}
					placeholder={props.placeholder}
					disabled={props.disabled}
					onChange={props.onChange}
					value={props.value}
					className={`w-full h-full block text-sm border-2 rounded-lg
							disabled:bg-gray-300 disabled:border-gray-400 resize-none
							focus:outline-none focus:ring-0.2 focus:ring-offset-0.5
						${
							props.error
								? "border-red-500 focus:border-red-500 focus:ring-red-500"
								: "border-gray-900 focus:border-gray-900 focus:ring-gray-900"
						}`}
					style={props.style ? props.style : { height: props.height }}
				/>
			)}
			{typeInput && (
				<input
					type={props.type}
					id={props.id}
					name={props.name}
					placeholder={props.placeholder}
					disabled={props.disabled}
					value={props.value}
					onChange={props.onChange}
					className={`w-full h-100 block text-sm border-2 rounded-lg
							disabled:bg-gray-300 disabled:border-gray-400
							focus:outline-none focus:ring-0.2 focus:ring-offset-0.5
							${
								props.error
									? "border-red-500 focus:border-red-500 focus:ring-red-500"
									: "border-gray-900 focus:border-gray-900 focus:ring-gray-900"
							}`}
					style={props.style ? props.style : { height: props.height }}
				/>
			)}
			{props.error && (
				<p className="mt-1 text-sm text-red-600 dark:text-red-500 font-medium">
					{props.error}
				</p>
			)}
		</div>
	);
};

export default TextField;
