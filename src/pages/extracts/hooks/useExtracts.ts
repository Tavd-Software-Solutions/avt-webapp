import { useCallback, useEffect, useRef, useState } from "react";
import useChart from "../../../context/hooks/useChart";
import { ChartPage, IComponentCard } from "../../../types/Interfaces.type";
import useWindowSize from "../../../hooks/useWindowsSize";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const useExtracts = () => {
	const { listPages, updateItemPosition, addNewPage, changeComponentPage, countPages } = useChart();
	const { width } = useWindowSize();

	const [draggedComponent, setDraggedComponent] = useState<IComponentCard | null>(null);
	const [currentPage, setCurrentPage] = useState<ChartPage | null>(null);

	const handleDragStart = (component: IComponentCard) => {
		setDraggedComponent(component);
	};

	const handleDragEnd = useCallback(() => {
		setDraggedComponent(null);
	}, []);

	const handleDragEnter = (event: React.DragEvent<HTMLDivElement>, page: ChartPage) => {
    setCurrentPage(page);
  };

  const handleDragLeave = () => {
    setCurrentPage(null);
  };

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		const clientX = event.clientX;
		const clientY = event.clientY;

		const parentDiv = event.currentTarget;
		const parentRect = parentDiv.getBoundingClientRect();

		const object = {
			top: 30,
			right: width > 768 ? 90 : 0,
			left: width > 768 ? 100 : 0
		}

		if (clientX >= parentRect.left &&
			clientX <= parentRect.right &&
			clientX - object.left >= parentRect.left &&
			clientX + object.right <= parentRect.right) {
			if (draggedComponent) {
				if (draggedComponent.page === 0  && clientY - object.top <= parentRect.top) return;
				const newX = clientX - parentRect.left;
				const newY = clientY - parentRect.top;

				let adjustedX = newX - 300;

				if (clientX - 300 <= parentRect.left) {
					adjustedX += 200;
				}
				if (clientX + 150 >= parentRect.right) {
					adjustedX -= 100;
				}
				adjustedX = clientX - 300 <= parentRect.left ? adjustedX + 200 : adjustedX;

				if (clientY + 300 >= parentRect.bottom || clientY >= parentRect.bottom) {
					draggedComponent.x = 50;
					draggedComponent.y = 20;
					const newPage = currentPage && draggedComponent.page > currentPage.page ? currentPage.page : draggedComponent.page + 1;
					if (draggedComponent.page == 0 && countPages == 1 && draggedComponent.page == currentPage?.page) {
						return addNewPage(draggedComponent);
					}
					return changeComponentPage(draggedComponent, newPage);
				}

				if ((clientY - 100 <= parentRect.top || clientY <= parentRect.top) && draggedComponent.page !== 0) {
					draggedComponent.y = 600;
					const newPage = currentPage && draggedComponent.page < currentPage.page ? currentPage.page : draggedComponent.page - 1;
					return changeComponentPage(draggedComponent, newPage);
				}

				if (currentPage && currentPage.page !== draggedComponent.page) {
					draggedComponent.y = 20;
					return changeComponentPage(draggedComponent, currentPage.page);
				}

				updateItemPosition(draggedComponent.id, adjustedX, newY);
			}
		}
	};

	const handlePrint = async () => {
    const pdf = new jsPDF();

		const pageHeight = pdf.internal.pageSize.getHeight();

		for (let indexPage = 0; indexPage < listPages.length; indexPage++) {
			const page = listPages[indexPage];
			if (indexPage > 0) {
				pdf.addPage();
			}
			const element = document.getElementById(page.id);
      if (element) {
        const canvas = await html2canvas(element);
        const imgWidth = 200; 
        const imgHeight = pageHeight - 80;

        pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
      }

		};

		pdf.save('extracts.pdf');
  };

	return { listPages, handleDragStart, handleDragEnd, handleDrop, handleDragEnter, handleDragLeave, handlePrint, addNewPage };
};
