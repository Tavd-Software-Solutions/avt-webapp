export interface IRegisterUser {
	name: string;
	email: string;
	password: string;
	login: string;
	coin: string;
	confirmPassword: string;
}

export interface IProfile {
	name: string;
	email: string;
	login: string;
}

type FormType = "NEW" | "VIEW";

export interface IRegisterForm {
	type: FormType;
}
