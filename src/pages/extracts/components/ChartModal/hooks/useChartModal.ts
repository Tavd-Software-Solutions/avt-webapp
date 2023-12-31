import { useFormik } from "formik";
import RevenueApi from "../../../../../api/Revenues";
import {
	ChartType,
	FilterMetricsOptions,
	IChartCreate,
	ISelectOption,
	PaymentMethods,
	TypeRevenue,
} from "../../../../../types/Interfaces.type";
import { useState } from "react";
import { useQuery } from "react-query";
import TagsApi from "../../../../../api/Tags";
import { Tags } from "../../../../../types/tags.types";
import { chartModalSchema } from "../utils/charModal.schemas";
import { IChartModal } from "../utils/chartModal.types";
import useChart from "../../../../../context/hooks/useChart";
import { v4 as uuid } from "uuid";

export const useChartModal = (props: IChartModal) => {
	const api = RevenueApi();
	const tagApi = TagsApi();
	const [tags, setTags] = useState<ISelectOption[]>();
	const { addListComponent } = useChart();

	const chartTypes: ISelectOption<ChartType>[] = [
		{ name: "Bars", data: ChartType.BAR },
		{ name: "Pie", data: ChartType.PIE },
		{ name: "Stacked", data: ChartType.STACKED },
	];

	const payMethods: ISelectOption<PaymentMethods>[] = [
		{ name: "Pix", data: PaymentMethods.PIX },
		{ name: "Credit Card", data: PaymentMethods.CREDITCARD },
		{ name: "Debit Card", data: PaymentMethods.DEBITCARD },
		{ name: "Money", data: PaymentMethods.MONEY },
	];

	const typeRevenues: ISelectOption<TypeRevenue>[] = [
		{ name: "Incoming", data: TypeRevenue.INCOMING },
		{ name: "Expense", data: TypeRevenue.EXPENSE },
	];

	const validationSchema = chartModalSchema();
	const newChart = useFormik<IChartCreate>({
		initialValues: {
			title: "",
			type: null,
			tagIds: [],
			payMethods: [],
			typeRevenue: [],
			startDate: null,
			endDate: null,
		},
		validationSchema: validationSchema,
		validateOnChange: false,
		enableReinitialize: true,

		onSubmit: (value, { resetForm }) => {
			const newObject = value;
			newObject.payMethods;
			newObject.typeRevenue;
			newObject.type = value.type ? Number(value.type) : null;

			createChart(newObject);
			resetForm();
		},
	});

	useQuery(["tags-list"], () => tagApi.listAllTags(), {
		onSuccess: (data) => {
			setTags(
				data?.map((e: Tags) => {
					return { name: e.name, data: e.id };
				}),
			);
		},
		retry: 2,
		enabled: props.open === true && newChart.values.type !== null,
	});

	const createChart = async (values: IChartCreate) => {
		let data = null;

		if (values.type === ChartType.BAR) {
			const obj: FilterMetricsOptions = {
				startDate: values.startDate,
				endDate: values.endDate,
				tagId: values.tagIds,
				payMethod: values.payMethods,
				typeRevenue: values.typeRevenue,
			};
			data = await api.getBarChart(obj);
		}
		if (values.type === ChartType.PIE) {
			data = await api.getRevenuePieChart();
		}
		if (values.type === ChartType.STACKED) {
			data = await api.getStackedChart();
		}

		if (data !== null && values.type) {
			addListComponent({
				id: uuid(),
				type: values.type,
				data: data,
				title: values.title,
				x: 50,
				y: 20,
				page: 0,
			});

			return props.setFalse();
		}
	};

	const handleChangeArray = (array: any[], value: any, name: string) => {
		if (array.includes(value)) {
			array.splice(array.indexOf(value), 1);
		} else {
			array.push(value);
		}
		newChart.setFieldValue(name, array);
	};

	return { newChart, tags, chartTypes, payMethods, typeRevenues, handleChangeArray };
};
