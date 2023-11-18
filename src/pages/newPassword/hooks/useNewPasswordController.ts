import { useFormik } from "formik";
import { useState } from "react";
import useAuth from "../../../context/hooks/useAuth";
import UserApi from "../../../api/Users";
import {
	IGetRecoverCode,
	IRecoverPassword,
	IValidateRecoverCode,
} from "../../../types/users.types";
import { newPasswordFormSchema } from "../utils/newPasswordForm.schema";

export const useNewPasswordController = () => {
	const [step, setStep] = useState(1);

	const api = UserApi();
	const { setToken } = useAuth();
	const [error, setError] = useState();

	const getRecoverCodeForm = useFormik<IGetRecoverCode>({
		initialValues: {
			email: "",
		},
		onSubmit: async (value) => {
			try {
				await api.getRecoverCode(value);
				setStep(2);
			} catch (error: any) {
				setError(error);
			}
		},
	});

	const validateCodeForm = useFormik<IValidateRecoverCode>({
		initialValues: {
			recoverCode: "",
		},
		onSubmit: async (value) => {
			try {
				const response = await api.validateRecoverCode(value);
				if (response.access_token) {
					setToken(response.access_token);
					setStep(3);
				}
			} catch (error: any) {
				setError(error);
			}
		},
	});

	const recoverPasswordForm = useFormik<IRecoverPassword>({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: newPasswordFormSchema(),
		onSubmit: async (value) => {
			try {
				const { confirmPassword, ...restValues } = value;
				await api.recoverPassword(restValues as IRecoverPassword);
			} catch (error: any) {
				setError(error);
			}
		},
	});

	return { step, getRecoverCodeForm, validateCodeForm, recoverPasswordForm, error };
};
