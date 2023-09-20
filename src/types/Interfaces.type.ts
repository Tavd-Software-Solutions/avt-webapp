export interface ISelectOption<T = any> {
	name: string;
	data: T;
}

export type PageOrder = "ASC" | "DESC";

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
	EXPENSE = 1,
	INCOMING = 2,
}

export enum PaymentMethods {
	PIX = 1,
	CREDITCARD = 2,
	DEBITCARD = 3,
	MONEY = 4,
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
	payMethod: number;
	date: Date;
	typeRevenue: number;
	description?: string;
}

export type MODALTYPE = "tags" | "sources";

export interface FilterOptions {
	name?: string;
	value?: number | null;
	tagId?: string;
	payMethod?: PaymentMethods | null;
	typeRevenue?: TypeRevenue | null;
	startDate?: Date | null;
	endDate?: Date | null;
}

export interface FilterMetricsOptions {
	tagId?: string;
	payMethod?: PaymentMethods | null;
	typeRevenue?: TypeRevenue | null;
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

export interface IChartCard {
	id: number;
	type: ChartType;
	data: IChartData;
}
