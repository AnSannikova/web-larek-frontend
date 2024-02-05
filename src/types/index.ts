export interface IProduct {
	id: string;
	descridtion: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export type PaymentType = 'card' | 'cash';

export interface IOrder {
	payment: PaymentType;
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
}

export interface IProductItem extends IProduct {
	basketState: boolean;
}

export interface IAppSateData {
	products: IProductItem[];
	basket: string[];
	order: IOrder;
}

export interface IPageData {
	counter: number;
	locked: boolean;
}

export interface IGalleryData {
	items: HTMLButtonElement[];
}

export interface IGalleryActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICardAction {
	onClick: (event: MouseEvent) => void;
}

export interface IBasketData {
	items: HTMLElement[];
	total: number;
}

export interface IOrderForm {
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface ISuccessData {
	description: number;
}

export interface ISuccesssAction {
	onClick: () => void;
}
