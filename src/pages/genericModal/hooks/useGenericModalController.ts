import { useMutation, useQuery, useQueryClient } from "react-query";
import TagsApi from "../../../api/Tags";
import SourcesApi from "../../../api/Sources";
import { Data, IData, IGenericModalProps } from "../utils/genericModal.types";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { MODALTYPE } from "../../../types/Interfaces.type";

export const useGenericModalController = (props: IGenericModalProps) => {
	const apiTags = TagsApi();
	const apiSources = SourcesApi();

	const queryClient = useQueryClient();
	const [previousValue, setPreviousValue] = useState<MODALTYPE | null>(null);

	useMemo(() => {
		if (previousValue !== props.type) {
			setPreviousValue(props.type);
		}
	}, [props.open]);

	const form = useFormik<IData>({
		initialValues: {
			name: "",
		},
		onSubmit: async (value, { resetForm }) => {
			if (props.type === "tags") {
				await apiTags.postTags(value);
			}
			if (props.type === "sources") {
				await apiSources.postSource(value);
			}
			queryClient.invalidateQueries(["generic-list"]);
			resetForm();
		},
	});

	const title = props.type === "tags" ? "Tags" : "Sources";

	const list = useQuery<Data>(
		["generic-list", { previousValue }],
		() => {
			if (props.type !== null) {
				form.values.name = "";
				if (props.type === "tags") {
					return apiTags.listAllTags();
				}
				if (props.type === "sources") {
					return apiSources.listSources();
				}
			}
			return [];
		},
		{ retry: 2 },
	);

	const deleteGeneric = useMutation(
		async (id: string | undefined) => {
			if (id) {
				if (props.type === "tags") {
					return await apiTags.deleteTag(id);
				}
				if (props.type === "sources") {
					return await apiSources.deleteSource(id);
				}
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["generic-list"]);
			},
		},
	);

	return { title, list: list.data, form, deleteGeneric, loading: list.isFetching };
};
