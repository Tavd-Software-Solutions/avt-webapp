import { useState } from "react";
import { useQuery } from "react-query";
import RevenueApi from "../../../api/Revenues";
import { FilterMetricsOptions } from "../../../types/Interfaces.type";
import moment from "moment";

export const useMetrics = () => {
	const revenueApi = RevenueApi();
	const [filter, setFilter] = useState<FilterMetricsOptions>({});

	const pieChartData = useQuery(
		"pie-chart",
		async () => {
			return await revenueApi.getRevenuePieChart();
		},
		{ keepPreviousData: true, refetchOnWindowFocus: false, retry: 2 },
	);

	const stackedChartData = useQuery(
		"stacked-chart",
		async () => {
			return await revenueApi.getStackedChart();
		},
		{ keepPreviousData: true, refetchOnWindowFocus: false, retry: 2 },
	);

	const barChartData = useQuery(
		["bar-chart", { filter }],
		async () => {
			if (filter.startDate) {
				filter.startDate = moment(filter.startDate).startOf("day").toDate();
			}
			if (filter.endDate) {
				filter.endDate = moment(filter.endDate).endOf("day").toDate();
			}
			return await revenueApi.getBarChart(filter);
		},
		{ keepPreviousData: true, refetchOnWindowFocus: false, retry: 2 },
	);

	const setListFiltered = (values: FilterMetricsOptions) => {
		setFilter({ ...filter, ...values });
	};

	const clearFilter = () => {
		setFilter({});
	};

	const chartPie = {
		tooltip: {
			trigger: "item",
		},
		legend: {
			orient: "horizontal",
			left: "left",
		},
		series: [
			{
				name: "Access From",
				type: "pie",
				radius: "50%",
				colorBy: "data",
				data: [
					{
						value: pieChartData.data?.expense,
						name: "Expense",
						itemStyle: { color: "#EE6767" },
					},
					{
						value: pieChartData.data?.incoming,
						name: "Incoming",
						itemStyle: { color: "#91CC75" },
					},
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
			},
		],
	};

	const chartStacked = {
		tooltip: {
			trigger: "axis",
		},
		legend: {
			data: ["Incoming", "Expense"],
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: stackedChartData.data?.dates,
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				name: "Incoming",
				type: "line",
				stack: "Total",
				data: stackedChartData.data?.incomings,
			},
			{
				name: "Expense",
				type: "line",
				stack: "Total",
				data: stackedChartData.data?.expenses,
			},
		],
	};

	const barOption = {
		legend: {
			data: ["Revenue"],
			left: "10%",
		},
		tooltip: {},
		xAxis: {
			data: barChartData.data?.dates,
			name: "X Axis",
			axisLine: { onZero: true },
			splitLine: { show: false },
			splitArea: { show: false },
		},
		yAxis: {},
		grid: {
			bottom: 100,
		},
		series: [
			{
				name: "Revenue",
				type: "bar",
				stack: "one",
				data: barChartData.data?.data,
			},
		],
	};

	return { chartPie, chartStacked, barOption, setListFiltered, clearFilter };
};
