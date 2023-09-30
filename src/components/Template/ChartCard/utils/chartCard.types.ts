import { ChartType, IChartData } from "../../../../types/Interfaces.type";

export interface IChartCardProps {
	id: string;
	x: number;
	y: number;
	title?: string;
	type: ChartType;
	data: IChartData;
	onDragStart: () => void;
	onDragEnd: () => void;
}
