import { ReactNode, createContext, useState } from "react";
import { IComponentCard } from "../types/Interfaces.type";

interface ChartProviderProps {
	children: ReactNode;
}

interface ChartContextType {
	listComponent: IComponentCard[];
	addListComponent: (value: IComponentCard) => void;
	updateItemPosition: (id: string, x: number, y: number) => void;
	removeListComponent: (id: string) => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

// eslint-disable-next-line react/prop-types
export const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
	const [listComponent, setListComponent] = useState<IComponentCard[]>([]);

	const addListComponent = (value: IComponentCard) => {
		setListComponent((prevListComponent) => [...prevListComponent, value]);
	};

	const removeListComponent = (id: string) => {
		setListComponent((prevListComponent) =>
			prevListComponent.filter((component) => component.id !== id),
		);
	};

	const updateItemPosition = (id: string, x: number, y: number) => {
		setListComponent((prevListComponent) =>
			prevListComponent.map((item) => (item.id === id ? { ...item, x, y } : item)),
		);
	};

	return (
		<ChartContext.Provider
			value={{ listComponent, addListComponent, removeListComponent, updateItemPosition }}
		>
			{children}
		</ChartContext.Provider>
	);
};

export default ChartContext;
