export interface ISelectOption<T = any> {
	name: string;
	data: T;
}

export type PageOrder = "asc" | "desc";

export interface IPageable {
	order: PageOrder;
	page: number;
	take: number;
}

export interface ISource {
	id: string;
	name: string;
}

export interface ITags {
	id: string;
	name: string;
}

export enum TypeRevenue {
	EXPENSE = "EXPENSE",
	INCOMING = "INCOMING",
}

export enum PaymentMethods {
	PIX = "PIX",
	CREDITCARD = "CREDITCARD",
	DEBITCARD = "DEBITCARD",
	MONEY = "MONEY",
}

export interface IRevenue {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	name: string;
	coin: string;
	value: number;
	source: ISource;
	tag: ITags;
	payMethod: PaymentMethods;
	date: Date;
	typeRevenue: TypeRevenue;
	description?: string;
}

export type MODALTYPE = "tags" | "sources";

export interface FilterOptions {
	name?: string;
	value?: number | null;
	tagId?: [];
	payMethod?: PaymentMethods[];
	typeRevenue?: TypeRevenue[];
	startDate?: Date | null;
	endDate?: Date | null;
}

export interface FilterMetricsOptions {
	tagId?: [];
	payMethod?: PaymentMethods[];
	typeRevenue?: TypeRevenue[];
	startDate?: Date | null;
	endDate?: Date | null;
}

export enum ChartType {
	BAR = 1,
	PIE = 2,
	STACKED = 3,
}

export interface IChartCreate {
	title?: string;
	type: ChartType | null;
	typeRevenue?: TypeRevenue | null;
	payMethods?: PaymentMethods | null;
	tagIds?: string;
	startDate?: Date | null;
	endDate?: Date | null;
}

export interface IPieChart {
	incoming: number;
	expense: number;
}

export interface IStackedChart {
	dates: string[];
	incomings: number[];
	expenses: number[];
}

export interface IBarChart {
	dates: string[];
	data: number[];
}

export interface IChartData {
	dates?: string[];
	data?: number[];
	incomings?: number[];
	expenses?: number[];
	incoming?: number;
	expense?: number;
}

export type IComponentCard = {
	id: string;
	x: number;
	y: number;
	text?: string;
	title?: string;
	type?: ChartType;
	data?: IChartData;
};

export type ChartPage = {
	id: string;
	page: number;
	components: IComponentCard[] | [];
};
