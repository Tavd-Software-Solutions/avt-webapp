import { ReactNode, createContext, useState } from "react";
import { IChartCard } from "../types/Interfaces.type";

interface ChartProviderProps {
	children: ReactNode;
}

interface ChartContextType {
	listChart: IChartCard[];
	addListChart: (value: IChartCard) => void;
	removeListChart: (id: number) => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

// eslint-disable-next-line react/prop-types
export const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
	const [listChart, setListChart] = useState<IChartCard[]>([]);

	const addListChart = (value: IChartCard) => {
		setListChart([...listChart, value]);
	};

	const removeListChart = (id: number) => {
		setListChart((prevListChart) => prevListChart.filter((chart) => chart.id !== id));
	};

	return (
		<ChartContext.Provider value={{ listChart, addListChart, removeListChart }}>
			{children}
		</ChartContext.Provider>
	);
};

export default ChartContext;
