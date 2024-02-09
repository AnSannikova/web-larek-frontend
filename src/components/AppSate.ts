import {
	IAppSateData,
	IProduct,
	IProductItem,
	IOrder,
	//PaymentType,
	FormErrors,
	IOrderForm,
	IContactsForm,
} from '../types';
import { Model } from './base/Model';

export class AppState extends Model<IAppSateData> {
	protected products: IProductItem[];
	protected basket: IProductItem[];
	protected order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		items: [],
		total: 0
	};
	protected formErrors: FormErrors = {};

	setProduct(items: IProduct[]) {
		this.products = items.map((item) => ({
			...item,
			basketState: false,
		}));
		this.emitChanges('gallery:changed', { products: this.products });
	}

	getProducts(): IProductItem[] {
		return this.products;
	}

	setPreviewCard(item: IProductItem) {
		this.emitChanges('preview:changed', item);
	}

	addToBasket(item: IProductItem) {
		this.products.find(product => item.id === product.id).basketState = true;
	}

	removeFromBasket(item: IProductItem) {
		this.products.find(product => item.id === product.id).basketState = false;
	}

	getBasketItems(): IProductItem[] {
		this.basket = this.products.filter((item) => {
			return item.basketState === true;
		});

		return this.basket;
	}

	getTotal(): number {
		return this.basket.reduce((accum, currentValue) => {
			return accum + currentValue.price;
		}, 0);
	}

	clearBasket() {
		this.basket.forEach((item) => {
			item.basketState = false;
		});
		
	}

	setOrderField(field: keyof (IContactsForm & IOrderForm), value: string) {
		this.order[field] = value;
		this.validateOrder();
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес доставки';
		}
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	getOrder(): IOrder {
		this.order.total = this.getTotal();
		this.order.items = this.getBasketItems().map(item => item.id);
		return this.order;
	}
}
