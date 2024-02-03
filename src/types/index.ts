import { IEvents } from '../components/base/events';

export interface IProduct {
	id: string;
	descridtion: string;
	image: string;
	title: string;
	category: string;
	price: number;
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

export interface IModel<T> {
	data: Partial<T>;
	events: IEvents;

	emitChanges(event: string, payload?: object): void;
}

export interface IComponent<T> {
	_container: HTMLElement;

	setText(element: HTMLElement, value: string): void;
	setImage(element: HTMLImageElement, src: string, alt?: string): void;
	toggleClass(element: HTMLElement, className: string, force?: boolean): void;
	setDisabled(elemnet: HTMLElement, state: boolean): void;
	render(data?: Partial<T>): HTMLElement;
}

export interface IModalData {
	content: HTMLElement;
}

export interface IModal {
	events: IEvents;
	button: HTMLButtonElement;
	_content: HTMLElement;

	content(value: HTMLElement): void;
	open(): void;
	close(): void;
	render(data: IModalData): HTMLElement;
}

export interface IForm<T> {
	container: HTMLFormElement;
	events: IEvents;
	_inputs: HTMLInputElement[];
	_button: HTMLButtonElement;
	_errors: HTMLSpanElement;

	errors(value: string): void;
	validate(): void;
	render(state: Partial<T>, errors: string[]): HTMLElement;
}

export interface IProductItem extends IProduct {
	basketState: boolean;

	inBasket(state: boolean): void;
}

export interface IAppSate {
	_products: IProductItem[];
	_order: IOrder;

	setProducts(values: IProduct[]): void;
	getProducts(): IProductItem[];
	getBasketItems(): IProductItem[];
	getTotal(): number;
	clearBasket(): void;
	setOrder(key: keyof IOrder, value: string): void;
	getOrder(): IOrder;
}

export interface IApiShop {
	cdnUrl: string;

	getItemList(): Promise<IProduct[]>;
	getItem(id: string): Promise<IProduct>;
	orderProducts(order: IOrder): Promise<IOrderResult>;
}

export interface IPageData {
	counter: number;
	locked: boolean;
}

export interface IPage {
	events: IEvents;
	_counter: HTMLSpanElement;
	_buttonBasket: HTMLButtonElement;
	_wrapper: HTMLElement;
	_locked: boolean;

	counter(value: number): void;
	locked(state: boolean): void;
}

export interface IGalleryData {
	items: HTMLButtonElement[];
}

export interface IGalleryActions {
	onClick: (event: MouseEvent) => void;
}

export interface IGallery {
	_items: HTMLButtonElement[];

	items(values: HTMLButtonElement[]): void;
}

export interface ICardAction {
	onClick: () => void;
}

export interface ICard {
	_id: string;
	_category?: HTMLSpanElement;
	_title: HTMLElement;
	_image?: HTMLImageElement;
	_description?: HTMLElement;
	_price: HTMLElement;
	_button?: HTMLButtonElement;

	id(value: string): void;
	category(value: string): void;
	title(value: string): void;
	image(value: string): void;
	descripton(value: string): void;
	price(valie: number): void;
}

export interface ICardBasketData {
	index: number;
}

export interface ICardBasket extends ICard {
	_index: HTMLElement;

	index(value: number): void;
}

export interface IBasketData {
	items: HTMLElement[];
	total: number;
}

export interface IBasket {
	events: IEvents;
	_basketList: HTMLElement;
	_button: HTMLButtonElement;
	_total: HTMLElement;

	items(values: HTMLElement[]): void;
	total(value: number): void;
}

export interface IOrderForm {
	payment: string;
	address: string;
}

export interface IOrderClass {
	events: IEvents;
	_buttons: HTMLButtonElement[];
	payment: string;

	address(value: string): void;
	validate(): void;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IContacts {
	email(value: string): void;
	phone(value: string): void;
}

export interface ISuccessData {
	description: number;
}

export interface ISuccesssAction {
	onClick: () => void;
}

export interface ISuccess {
	_description: HTMLElement;
	_button: HTMLButtonElement;

	description(value: number): void;
}
