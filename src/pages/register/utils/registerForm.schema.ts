import * as Yup from "yup";

export const registerFormSchema = () => {
	return Yup.object().shape({
		name: Yup.string().required("Name is required"),
		email: Yup.string().required("Email is required").email("Email needs to be valid"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Musy be at least 8 characters"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), ""], "Password must match")
			.required("Confirm Password is required"),
		login: Yup.string()
			.required("Login is required")
			.matches(/^\S+$/, "Não pode conter espaços entre os textos"),
	});
};
