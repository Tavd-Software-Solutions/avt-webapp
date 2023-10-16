import ReactECharts from "echarts-for-react";
import { BsTrash } from "react-icons/bs";
import { FiMove } from "react-icons/fi";
import { useChartCard } from "./hooks/useChartCard";
import useChart from "../../../context/hooks/useChart";
import { IChartCardProps } from "./utils/chartCard.types";
import { useState } from "react";

const ChartCard = (props: IChartCardProps) => {
	const [draggable, setDraggable] = useState<boolean>(false);
	const { removeListComponent } = useChart();
	const { dataOption } = useChartCard(props);

	const handleDraggable = () => setDraggable((prevDraggable) => !prevDraggable);

	return (
		<>
			<div
				className="h-min w-3/4 lg:w-1/2 absolute flex flex-col items-center justify-center shadow-md border border-gray-500"
				style={{ left: props.x, top: props.y }}
				draggable={draggable}
				onDrag={(event: React.DragEvent<HTMLDivElement>) => {
					props.onDragStart();
					event.dataTransfer.setData("text/plain", "");
				}}
				onDragEnd={props.onDragEnd}
			>
				<div
					className="w-full h-6 bg-gray-100 flex justify-end items-center border-b border-gray-500 
					px-4 gap-4 shadow-lg shadow-indigo-500/10"
				>
					<FiMove
						className="text-gray-800 cursor-pointer"
						onMouseDownCapture={handleDraggable}
					/>
					<BsTrash
						className="text-gray-800 cursor-pointer"
						onClick={() => removeListComponent(props.id)}
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
