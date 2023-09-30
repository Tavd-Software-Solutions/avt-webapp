import useChart from "../../../context/hooks/useChart";

export const useExtracts = () => {
	const { listComponent, updateItemPosition } = useChart();
	const handleDrag = (event: React.DragEvent<HTMLDivElement>, id: string) => {
		event.preventDefault();

		const x = event.clientX;
		const y = event.clientY;

		updateItemPosition(id, x, y);
	};
	return { listComponent, handleDrag };
};
