import { useFormik } from "formik";
import { revenuesFormSchema } from "../utils/revenuesForm.schemas";
import { IRevenueSchema, IRevenuesForm } from "../utils/revenuesForm.types";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SourcesApi from "../../../../api/Sources";
import TagsApi from "../../../../api/Tags";
import RevenueApi from "../../../../api/Revenues";
import { useQuery } from "react-query";
import {
	IRevenue,
	ISelectOption,
	PaymentMethods,
	TypeRevenue,
} from "../../../../types/Interfaces.type";
import { Tags } from "../../../../types/tags.types";
import useAuth from "../../../../context/hooks/useAuth";
import moment from "moment";

export const useRevenuesFormController = (props: IRevenuesForm) => {
	const navigate = useNavigate();
	const sourceApi = SourcesApi();
	const tagApi = TagsApi();
	const revenueApi = RevenueApi();
	const { user } = useAuth();
	const { id } = useParams();
	const [tags, setTags] = useState<ISelectOption[]>([]);
	const [sources, setSources] = useState<ISelectOption[]>([]);

	useQuery(["find-revenue", { id }], {
		queryFn: () => {
			if (id) {
				return revenueApi.findRevenue(id);
			}
			return null;
		},
		onSuccess: (data: IRevenue) => {
			if (data) {
				revenue.setValues({
					name: data.name,
					coin: data.coin,
					value: data.value,
					sourceId: data.source.id,
					tagId: data.tag.id,
					payMethod: data.payMethod,
					typeRevenue: data.typeRevenue,
					date: moment(data.date).format("YYYY-MM-DD"),
					description: data.description,
					userId: user.uuid,
				});
			}
		},
		retry: 2,
	});

	useQuery("tags-list", {
		queryFn: () => tagApi.listAllTags(),
		onSuccess: (data) => {
			setTags(
				data?.map((e: Tags) => {
					return { name: e.name, data: e.id };
				}),
			);
		},
		retry: 2,
	});

	useQuery("sources-list", {
		queryFn: () => sourceApi.listSources(),
		onSuccess: (data) => {
			setSources(
				data?.map((e: Tags) => {
					return { name: e.name, data: e.id };
				}),
			);
		},
		retry: 2,
	});

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

	const validationSchema = revenuesFormSchema();
	const revenue = useFormik<IRevenueSchema>({
		initialValues: {
			name: "",
			coin: user.coin,
			value: 0,
			sourceId: null,
			tagId: null,
			payMethod: null,
			typeRevenue: null,
			date: null,
			description: "",
			userId: user.uuid,
		},
		validationSchema: validationSchema,
		validateOnChange: false,
		onSubmit: (value, { resetForm }) => {
			const newObject = value;

			newObject.value = Number(newObject.value);

			if (!id) {
				revenueApi.postRevenue(newObject);
			}

			if (id) {
				revenueApi.updateRevenue(newObject, id);
				navigate("/revenue");
			}
			resetForm({ values: revenue.initialValues });
		},
	});

	const title: string = useMemo(() => {
		if (props.type === "NEW") {
			return "New expense";
		}
		if (props.type === "EDIT") {
			return "Edit expense";
		}
		if (props.type === "VIEW") {
			return "Details";
		}
		return "";
	}, [props.type]);

	return {
		revenue,
		title,
		navigate,
		tags,
		sources,
		payMethods,
		typeRevenues,
	};
};
