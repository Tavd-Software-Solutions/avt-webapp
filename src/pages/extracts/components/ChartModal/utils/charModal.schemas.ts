import * as Yup from "yup";

export const chartModalSchema = () => {
	return Yup.object().shape({
		type: Yup.string().required("Type is required"),
	});
};
