import { IRevenueSchema } from "../pages/expenses/form/utils/revenuesForm.types";
import { post, remove, getById, update, handleErrors } from "./Common";
import {
	IRevenueList,
	IRevenueOptions,
} from "../pages/expenses/list/utils/revenuesList.types";
import toast from "react-hot-toast";
import api from "./Api";
import {
	FilterMetricsOptions,
	IBarChart,
	IChartCreate,
	IPieChart,
	IRevenue,
	IStackedChart,
} from "../types/Interfaces.type";

const RevenueApi = () => {
	const url = "/revenues";

	const listAllRevenuesPageable = async (obj: IRevenueOptions): Promise<IRevenueList> => {
		try {
			return (await api.post(`${url}/list-all`, obj)).data;
		} catch (e: any) {
			return handleErrors(e);
		}
	};

	const findRevenue = async (id: string): Promise<IRevenue> => {
		return await getById(url, id);
	};

	const getAmount = async (): Promise<number> => {
		try {
			return (await api.get(`${url}/amount`)).data;
		} catch (e: any) {
			return handleErrors(e);
		}
	};

	const getRevenuePieChart = async (): Promise<IPieChart> => {
		try {
			return (await api.get(`${url}/pie-chart`)).data;
		} catch (e: any) {
			return handleErrors(e);
		}
	};

	const getStackedChart = async (): Promise<IStackedChart> => {
		try {
			return (await api.get(`${url}/stacked-chart`)).data;
		} catch (e: any) {
			return handleErrors(e);
		}
	};

	const getBarChart = async (
		obj: FilterMetricsOptions | IChartCreate,
	): Promise<IBarChart> => {
		try {
			return (await api.post(`${url}/bar-chart`, obj)).data;
		} catch (e: any) {
			return handleErrors(e);
		}
	};

	const postRevenue = async (obj: IRevenueSchema) => {
		return await post(url, obj).then(() => toast.success("Revenue created successfully"));
	};

	const updateRevenue = async (obj: IRevenueSchema, id: string) => {
		return await update(url, obj, id).then(() =>
			toast.success("Revenue updated successfully"),
		);
	};

	const deleteRevenue = async (id: string) => {
		return await remove(url, id).then(() =>
			toast.success("Revenue deleted successfully"),
		);
	};

	return {
		postRevenue,
		updateRevenue,
		deleteRevenue,
		listAllRevenuesPageable,
		getStackedChart,
		getBarChart,
		getAmount,
		findRevenue,
		getRevenuePieChart,
	};
};

export default RevenueApi;
