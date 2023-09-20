import { useContext } from "react";
import ChartContext from "../ChartsContext";

const useChart = () => {
	const chartData = useContext(ChartContext);

	if (!chartData) {
		throw new Error("useChart must be used within an ChartProvider");
	}

	return chartData;
};

export default useChart;
