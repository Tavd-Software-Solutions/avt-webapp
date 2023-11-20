import axios, { AxiosInstance, AxiosResponse } from "axios";
import useAuth from "../context/hooks/useAuth";
import { useEffect } from "react";

const api: AxiosInstance = axios.create({
	baseURL: "http://af18b3cf5f7c544db867745273cafd76-418763046.us-east-1.elb.amazonaws.com:3030/",
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
});

const AuthorizationInterceptor: React.FC = () => {
	const token = localStorage.getItem("token");
	const { logout } = useAuth();

	useEffect(() => {
		const requestInterceptor = api.interceptors.request.use(
			(config) => {
				if (token) {
					config.headers!.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);

		const responseInterceptor = api.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error) => {
				if (error.response?.status === 401 || error.response?.status === 403) {
					logout();
				}
				return Promise.reject(error);
			},
		);

		return () => {
			api.interceptors.request.eject(requestInterceptor);
			api.interceptors.response.eject(responseInterceptor);
		};
	}, [token]);

	return null;
};

export default api;

export { AuthorizationInterceptor };
