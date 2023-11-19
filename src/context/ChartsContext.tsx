import { ReactNode, createContext, useMemo, useState } from "react";
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
	changeComponentPage: (component: IComponentCard, page: number) => void;
	countPages: number;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
	const [listPages, setListPages] = useState<ChartPage[]>([
		{ id: uuid(), page: 0, components: [] },
	]);

	const countPages = useMemo(() => {
		return listPages.length;
	}, [listPages, setListPages]);

	const addListComponent = (value: IComponentCard, pageNumber = 0) => {
		setListPages((prevListPages) =>
			prevListPages.map((item) =>
				item.page === pageNumber
					? { ...item, components: [...item.components, value] }
					: item,
			),
		);
	};

	const removeListComponent = (id: string, newPage?: number) => {
		let pages = listPages.map((page) => {
			return {
				...page,
				components: page.components.filter((component) => component.id !== id),
			};
		});

		pages = pages.filter((page) => {
			if (
				page.page === 0 ||
				page.components.length > 0 ||
				(newPage && page.page == newPage)
			) {
				return page;
			}
		});

		setListPages(pages);
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
		if (component) {
			component.page += 1;

			removeListComponent(component.id, component.page - 1);
		}

		setListPages((prevListPages) => [
			...prevListPages,
			{
				id: uuid(),
				page: prevListPages.length,
				components: component ? [component] : [],
			},
		]);
	};

	const removePage = (id: string) => {
		setListPages((prevListPages) => prevListPages.filter((page) => page.id !== id));
	};

	const changeComponentPage = async (component: IComponentCard, page: number) => {
		if (countPages > 1 && countPages - 1 < page) {
			return addNewPage(component);
		}
		component.page = page;
		removeListComponent(component.id, page);

		addListComponent(component, page);
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
				changeComponentPage,
				countPages,
			}}
		>
			{children}
		</ChartContext.Provider>
	);
};

export default ChartContext;
