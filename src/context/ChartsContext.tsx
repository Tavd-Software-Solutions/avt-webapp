import { ReactNode, createContext, useState } from "react";
import { ChartPage, IComponentCard } from "../types/Interfaces.type";
import { v4 as uuid } from "uuid";

interface ChartProviderProps {
	children: ReactNode;
}

interface ChartContextType {
	addListComponent: (value: IComponentCard, pageNumber?: number) => void;
	updateItemPosition: (id: string, x: number, y: number) => void;
	removeListComponent: (id: string) => void;
	listPages: ChartPage[];
	addNewPage: (component?: IComponentCard) => void;
	removePage: (id: string) => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
	const [listPages, setListPages] = useState<ChartPage[]>([
		{ id: uuid(), page: 0, components: [] },
	]);

	const addListComponent = (value: IComponentCard, pageNumber = 0) => {
		setListPages((prevListPages) =>
			prevListPages.map((item) =>
				item.page === pageNumber
					? { ...item, components: [...item.components, value] }
					: item,
			),
		);
	};

	const removeListComponent = (id: string) => {
		setListPages((prevListPages) =>
			prevListPages.map((item) => {
				return {
					...item,
					components: item.components.filter((component) => component.id !== id),
				};
			}),
		);
	};

	const updateItemPosition = (id: string, x: number, y: number) => {
		setListPages((prevListPages) =>
			prevListPages.map((item) => {
				return {
					...item,
					components: item.components.map((item) =>
						item.id === id ? { ...item, x, y } : item,
					),
				};
			}),
		);
	};

	const addNewPage = (component?: IComponentCard) => {
		setListPages((prevListPages) => [
			...prevListPages,
			{
				id: uuid(),
				page: prevListPages.length + 1,
				components: component ? [component] : [],
			},
		]);
	};

	const removePage = (id: string) => {
		setListPages((prevListPages) => prevListPages.filter((page) => page.id !== id));
	};

	return (
		<ChartContext.Provider
			value={{
				addListComponent,
				removeListComponent,
				updateItemPosition,
				listPages,
				addNewPage,
				removePage,
			}}
		>
			{children}
		</ChartContext.Provider>
	);
};

export default ChartContext;
