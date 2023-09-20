import ReactECharts from "echarts-for-react";
import { BsTrash } from "react-icons/bs";
import { FiMove } from "react-icons/fi";
import { useChartCard } from "./hooks/useChartCard";
import { IChartCard } from "../../../types/Interfaces.type";
import useChart from "../../../context/hooks/useChart";

const ChartCard = (props: IChartCard) => {
	const { dataOption } = useChartCard(props);
	const { removeListChart } = useChart();

	return (
		<>
			<div
				className="h-min flex flex-col items-center justify-center shadow-md border border-gray-500"
				style={{ width: "45%" }}
				draggable={true}
			>
				<div
					className="w-full h-6 bg-gray-100 flex justify-end items-center border-b border-gray-500 
					px-4 gap-4 shadow-lg shadow-indigo-500/10"
				>
					<FiMove className="text-gray-800 cursor-pointer" />
					<BsTrash
						className="text-gray-800 cursor-pointer"
						onClick={() => removeListChart(props.id)}
					/>
				</div>
				<div className="w-full">
					<ReactECharts
						option={dataOption}
						notMerge={true}
						lazyUpdate={true}
						theme={"theme_name"}
					/>
				</div>
			</div>
		</>
	);
};

export default ChartCard;
