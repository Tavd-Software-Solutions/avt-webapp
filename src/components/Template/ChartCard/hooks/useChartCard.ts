import { useMemo } from "react";
import { ChartType, IChartCard } from "../../../../types/Interfaces.type";

export const useChartCard = (props: IChartCard) => {
	const dataOption = useMemo(() => {
		if (props.type === ChartType.PIE) {
			return {
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
								value: props.data?.expense,
								name: "Expense",
								itemStyle: { color: "#EE6767" },
							},
							{
								value: props.data?.incoming,
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
		}
		if (props.type === ChartType.STACKED) {
			return {
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
					data: props.data?.dates,
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						name: "Incoming",
						type: "line",
						stack: "Total",
						data: props.data?.incomings,
					},
					{
						name: "Expense",
						type: "line",
						stack: "Total",
						data: props.data?.expenses,
					},
				],
			};
		}
		if (props.type === ChartType.BAR) {
			return {
				legend: {
					data: ["Revenue"],
					left: "10%",
				},
				tooltip: {},
				xAxis: {
					data: props.data?.dates,
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
						data: props.data?.data,
					},
				],
			};
		}
		return null;
	}, [props]);

	return { dataOption };
};
