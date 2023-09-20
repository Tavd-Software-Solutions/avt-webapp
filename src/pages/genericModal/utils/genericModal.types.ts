import { MODALTYPE } from "../../../types/Interfaces.type";
import { Sources } from "../../../types/sources.types";
import { Tags } from "../../../types/tags.types";

export type Data = Sources[] | Tags[];

export interface IGenericModalProps {
	type: MODALTYPE | null;
	open: boolean;
	setFalse: () => void;
}

export interface IData {
	name: string;
}
