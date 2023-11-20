import { listAll, post, remove, update, getById, passwordCommands } from "./Common";
import {
	UsersDto,
	IGetRecoverCode,
	IValidateRecoverCode,
	IRecoverPassword,
} from "../types/users.types";
import toast from "react-hot-toast";

const UserApi = () => {
	const url = "/users";

	const listUsers = async () => {
		return await listAll(url);
	};

	const postUser = async (obj: UsersDto) => {
		return await post(url, obj).then(() => toast.success("User created successfully"));
	};

	const getUserById = async (id: string) => {
		return await getById(url, id);
	};

	const updateUser = async (obj: UsersDto, id: string) => {
		return await update(url, obj, id).then(() =>
			toast.success("User updated successfully"),
		);
	};

	const deleteUser = async (id: string) => {
		return await remove(url, id);
	};

	const getRecoverCode = async (obj: IGetRecoverCode) => {
		return await passwordCommands(`${url}/get-recover-code`, obj);
	};

	const validateRecoverCode = async (obj: IValidateRecoverCode) => {
		return await passwordCommands(`${url}/validate-recover-code`, obj);
	};

	const recoverPassword = async (obj: IRecoverPassword) => {
		return await passwordCommands(`${url}/recover-password`, obj).then(() =>
			toast.success("Password updated successfully"),
		);
	};

	return {
		listUsers,
		postUser,
		getUserById,
		updateUser,
		deleteUser,
		getRecoverCode,
		validateRecoverCode,
		recoverPassword,
	};
};

export default UserApi;
