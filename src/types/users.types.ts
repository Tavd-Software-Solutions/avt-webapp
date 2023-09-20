export interface Users {
	id: string;
	createdAt: string;
	updatedAt?: null;
	deletedAt?: null;
	email: string;
	name: string;
	password: string;
	login: string;
}

export interface UsersDto {
	email: string;
	name: string;
	password: string;
	login: string;
}
