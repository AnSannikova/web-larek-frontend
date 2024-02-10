export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IModalData {
	content: HTMLElement;
}

export interface IFormState {
	errors: string[];
	valid: boolean;
}

export interface IProductItem extends IProduct {
	basketState: boolean;
}

export interface IAppSateData {
	products: IProductItem[];
	basket: IProductItem[];
	order: IOrder;
}

export interface IPageData {
	counter: number;
	gallery: HTMLElement[];
	locked: boolean;
}

export interface ICardData extends IProduct {
	buttonLable: boolean;
	index?: number;
}

export interface ICardAction {
	onClick?: () => void;
}

export interface IBasketData {
	items: HTMLElement[];
	total: number;
}

export interface IOrderForm {
	payment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface ISuccessData {
	description: number;
}

export interface ISuccesssAction {
	onClick: () => void;
}
