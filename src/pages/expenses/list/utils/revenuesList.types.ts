import { FilterOptions, IPageable } from "../../../../types/Interfaces.type";

export interface IRevenueList {
	data: RevenueEntity[] | [];
	options: Options;
}

export interface RevenueEntity {
	id: string;
	createdAt: string;
	updatedAt?: null;
	deletedAt?: null;
	name: string;
	coin: string;
	value: number;
	payMethod: number;
	date: string;
	description: string;
	typeRevenue: number;
}

export interface Options {
	page: number;
	take: number;
	itemCount: number;
	pageCount: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}
export interface IRevenueOptions extends IPageable {
	where: FilterOptions;
}
