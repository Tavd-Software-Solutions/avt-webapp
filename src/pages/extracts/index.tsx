import { BsPrinterFill } from "react-icons/bs";
import useBoolean from "../../hooks/useBoolean";
import { ChartModal } from "./components/ChartModal/ChartModal";
import useChart from "../../context/hooks/useChart";
import ChartCard from "../../components/Template/ChartCard";

const ExtractsList = () => {
	const [bool, { setTrue, setFalse }] = useBoolean(false);
	const { listChart } = useChart();

	return (
		<>
			<ChartModal open={bool} setFalse={setFalse} />
			<main className="w-full h-full flex flex-1 flex-col items-center">
				<div className="w-full h-16 bg-gray-950 flex justify-center">
					<div className="w-4/5 h-full flex justify-between items-center px-4">
						<div className="h-7 cursor-pointer border-2 border-white rounded p-1">
							<h2 className="text-white text-sm font-bold" onClick={setTrue}>
								Add Chart
							</h2>
						</div>
						<div className="cursor-pointer border-2 border-white rounded p-1">
							<BsPrinterFill size={16} color="white" />
						</div>
					</div>
				</div>
				<div className="w-full h-full flex justify-center gap-4 py-8 overflow-auto bg-gray-200">
					<div
						className="w-4/5 flex flex-wrap justify-center items-start bg-white gap-1 shadow-md p-6"
						style={{ height: 1122 }}
					>
						{listChart.map((chart, index) => (
							<ChartCard key={index} id={chart.id} type={chart.type} data={chart.data} />
						))}
					</div>
				</div>
			</main>
		</>
	);
};

export default ExtractsList;
