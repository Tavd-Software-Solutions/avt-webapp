import { ISelectOption } from "../../../types/Interfaces.type";

export interface IDropdownProps {
    options: ISelectOption[];
    value: ISelectOption[];
    name: string;
    disabled?: boolean;
    onChange: (event: any) => any | void;
}