import { FilterOptions } from "../../../types/Interfaces.type";

export interface ISideNavProps {
	isOpen: boolean;
	setIsFalse: () => void;
	setWhere: (value: FilterOptions) => void;
	clearFilter: () => void;
}
