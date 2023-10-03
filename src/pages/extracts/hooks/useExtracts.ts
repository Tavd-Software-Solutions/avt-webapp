import { useCallback, useState } from "react";
import useChart from "../../../context/hooks/useChart";
import { IComponentCard } from "../../../types/Interfaces.type";

export const useExtracts = () => {
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

	return { listComponent, handleDragStart, handleDragEnd, handleDrop };
};
