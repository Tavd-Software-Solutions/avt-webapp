import { useFormik } from "formik";
import { useState, useMemo } from "react";
import { IProfile, IRegisterUser } from "../utils/register.types";
import { registerFormSchema } from "../utils/registerForm.schema";
import UserApi from "../../../api/Users";
import useAuth from "../../../context/hooks/useAuth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import coins from "../utils/coins.json";

export const useRegisterController = () => {
	const { user } = useAuth();
	const [error] = useState();
	const validationSchema = registerFormSchema();
	const navigate = useNavigate();
	const userApi = UserApi();

	const jsonCoins: any = coins;

	const coinsOptions = useMemo(() => {
		return Object.keys(jsonCoins).map((coin: string) => {
			return { name: jsonCoins[coin].name, data: coin };
		});
	}, [jsonCoins]);

	// console.log(coins.AED)

	const userForm = useFormik<IRegisterUser>({
		initialValues: {
			name: "",
			email: "",
			password: "",
			login: "",
			coin: "",
			confirmPassword: "",
		},
		validationSchema: validationSchema,
		validateOnChange: false,
		onSubmit: (value) => {
			const { confirmPassword, ...restValues } = value;
			userApi.postUser(restValues).then(() => {
				userForm.resetForm({ values: userForm.initialValues });
				navigate("/");
			});
		},
	});

	useQuery(["find-user", { user }], {
		queryFn: () => {
			if (user.uuid && user.uuid !== "") {
				return userApi.getUserById(user.uuid);
			}
			return null;
		},
		onSuccess: (data: IProfile) => {
			if (data) {
				userForm.setValues({
					name: data.name,
					email: data.email,
					login: data.login,
					coin: "",
					password: "",
					confirmPassword: "",
				});
			}
		},
		retry: 2,
	});

	return { userForm, error, coinsOptions };
};
