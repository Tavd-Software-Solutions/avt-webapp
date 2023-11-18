import * as Yup from "yup";

export const newPasswordFormSchema = () => {
	return Yup.object().shape({
		newPassword: Yup.string()
			.required("Password is required")
			.min(8, "Must be at least 8 characters"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("newPassword"), ""], "Password must match")
			.required("Confirm Password is required"),
	});
};
