import { useFormik } from "formik";

import { ISideNavProps } from "../utils/sideNav.types";
import TagsApi from "../../../api/Tags";
import { useState } from "react";
import {
	FilterOptions,
	ISelectOption,
	PaymentMethods,
	TypeRevenue,
} from "../../../types/Interfaces.type";
import { useQuery } from "react-query";
import { Tags } from "../../../types/tags.types";

export const useFilterForm = (props: ISideNavProps) => {
	const tagApi = TagsApi();
	const { setWhere, setIsFalse } = props;
	const [tags, setTags] = useState<ISelectOption[]>([]);

	useQuery("tags-list", {
		queryFn: () => tagApi.listAllTags(),
		onSuccess: (data) => {
			setTags(
				data?.map((e: Tags) => {
					return { name: e.name, data: e.id };
				}),
			);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const clearFilter = () => {
		if (props.clearFilter) {
			props.clearFilter();
			filter.resetForm();
		}
	};

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

	const filter = useFormik<FilterOptions>({
		initialValues: {
			name: "",
			tagId: "",
			payMethod: null,
			typeRevenue: null,
			value: null,
			startDate: null,
			endDate: null,
		},
		onSubmit: (value) => {
			const newObject = value;
			newObject.payMethod = value.payMethod ? Number(value.payMethod) : null;
			newObject.typeRevenue = value.typeRevenue ? Number(value.typeRevenue) : null;
			setWhere(newObject);
			if (value !== filter.initialValues) {
				setIsFalse();
			}
		},
	});

	return { filter, payMethods, tags, typeRevenues, clearFilter };
};
