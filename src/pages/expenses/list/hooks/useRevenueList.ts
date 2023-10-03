import { useState } from "react";
import { IRevenueList, IRevenueOptions } from "../utils/revenuesList.types";
import RevenueApi from "../../../../api/Revenues";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FilterOptions } from "../../../../types/Interfaces.type";

export const useRevenueList = () => {
	const revenueApi = RevenueApi();
	const queryClient = useQueryClient();
	const [revenueList, setRevenueList] = useState<IRevenueList>();
	const [pageable, setPageable] = useState<IRevenueOptions>({
		order: "asc",
		page: 1,
		take: 10,
		where: {},
	});

	const amount = useQuery(
		["amount", { revenueList }],
		async () => {
			return await revenueApi.getAmount();
		},
		{ keepPreviousData: true, refetchOnWindowFocus: false, retry: 2 },
	);

	const { isFetching } = useQuery<IRevenueList>(["revenue-list", { pageable }], {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		queryFn: async () => await revenueApi.listAllRevenuesPageable(pageable),
		onSuccess: (data) => {
			if (data.options.page === 1 && !revenueList?.options.hasNextPage) {
				return setRevenueList(data);
			}
			if (revenueList) {
				return setRevenueList({
					data: [...revenueList?.data, ...data.data],
					options: data.options,
				});
			}
		},
		onError: (error) => {
			console.log(error);
		},
		retry: 2,
	});

	const changePage = () => {
		if (revenueList?.options.hasNextPage) {
			setPageable({
				...pageable,
				page: pageable.page + 1,
			});
		}
	};

	const deleteRevenue = useMutation(
		async (id: string | undefined) => {
			if (id) {
				return await revenueApi.deleteRevenue(id);
			}
		},
		{
			onSuccess: () => {
				setPageable({
					...pageable,
					page: 1,
				});
				queryClient.invalidateQueries(["revenue-list"]);
			},
		},
	);

	const setListFiltered = (values: FilterOptions) => {
		setPageable({ ...pageable, where: values });
	};

	const clearFilter = () => {
		setPageable({ ...pageable, where: {} });
	};

	return {
		list: revenueList?.data,
		changePage,
		deleteRevenue,
		amount: amount.data,
		loading: isFetching,
		setListFiltered,
		clearFilter,
	};
};
