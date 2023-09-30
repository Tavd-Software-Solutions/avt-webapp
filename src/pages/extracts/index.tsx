import { BsPrinterFill } from "react-icons/bs";
import useBoolean from "../../hooks/useBoolean";
import { ChartModal } from "./components/ChartModal/ChartModal";
import ChartCard from "../../components/Template/ChartCard";
import { IComponentCard } from "../../types/Interfaces.type";
import { useExtracts } from "./hooks/useExtracts";
import useChart from "../../context/hooks/useChart";
import { useCallback, useState } from "react";

const ExtractsList = () => {
	const [bool, { setTrue, setFalse }] = useBoolean(false);

	const { listComponent, updateItemPosition } = useChart();
	const [draggedComponent, setDraggedComponent] = useState<IComponentCard | null>(null);

	const handleDragStart = (component: IComponentCard) => {
		setDraggedComponent(component);
	};

	const handleDragEnd = useCallback(() => {
		setDraggedComponent(null);
	}, []);

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		const clientX = event.clientX;
		const clientY = event.clientY;

		const parentDiv = event.currentTarget;
		const parentRect = parentDiv.getBoundingClientRect();

		if (
			clientX >= parentRect.left &&
			clientX <= parentRect.right &&
			clientY >= parentRect.top &&
			clientY <= parentRect.bottom &&
			clientX - 100 >= parentRect.left &&
			clientX + 90 <= parentRect.right &&
			clientY - 30 >= parentRect.top &&
			clientY + 300 <= parentRect.bottom
		) {
			if (draggedComponent) {
				const newX = clientX - parentRect.left;
				const newY = clientY - parentRect.top;

				let adjustedX = newX - 300;

				console.log(adjustedX);
				if (clientX - 300 <= parentRect.left) {
					adjustedX += 200;
				}
				if (clientX + 150 >= parentRect.right) {
					adjustedX -= 100;
				}
				adjustedX = clientX - 300 <= parentRect.left ? adjustedX + 200 : adjustedX;

				updateItemPosition(draggedComponent.id, adjustedX, newY);
			}
		}
	};
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
						className="w-4/5 relative bg-white shadow-md p-6"
						style={{ height: 1122 }}
						onDrop={handleDrop}
						onDragOver={(event) => event.preventDefault()}
					>
						{listComponent.map((component: IComponentCard, index) => {
							if (component.data && component.type) {
								return (
									<ChartCard
										key={index}
										id={component.id}
										type={component.type}
										data={component.data}
										x={component.x}
										y={component.y}
										onDragStart={() => handleDragStart(component)}
										onDragEnd={handleDragEnd}
									/>
								);
							}
						})}
					</div>
				</div>
			</main>
		</>
	);
};

export default ExtractsList;
