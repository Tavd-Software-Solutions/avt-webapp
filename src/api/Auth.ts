import toast from "react-hot-toast";
import { ILoginRequest, ILoginResponse } from "../types/auth.types";
import api from "./Api";

const AuthApi = () => {
	const path = `${api.defaults.baseURL}auth`;

	const login = async (body: ILoginRequest): Promise<ILoginResponse> => {
		try {
			return await api.post(`${path}/login`, body).then((value) => {
				toast.success("User successfully logged in");
				return value.data;
			});
		} catch (error: any) {
			if (error?.response?.data?.message) {
				return Promise.reject(error.response.data.error);
			}
			return Promise.reject(error.message);
		}
	};

	return { login };
};

export default AuthApi;
