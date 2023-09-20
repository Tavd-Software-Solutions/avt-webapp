import { PaymentMethods, TypeRevenue } from "../../../../types/Interfaces.type";

export enum revenuesTags {
	alimentacao,
	lazer,
	trabalho,
	transporte,
	saude,
}

export enum paymentMethods {
	dinheiro,
	credito,
	debito,
}

type FormType = "NEW" | "VIEW" | "EDIT";

export interface IRevenuesForm {
	type: FormType;
}

export interface IRevenueSchema {
	id?: string;
	name: string;
	coin: string;
	value: number;
	sourceId: string | null;
	tagId: string | null;
	payMethod: PaymentMethods | null;
	date: Date | string | null;
	typeRevenue: TypeRevenue | null;
	description?: string;
	userId: string;
}
