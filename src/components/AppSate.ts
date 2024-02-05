import {
	IAppSateData,
	IProduct,
	IProductItem,
	IOrder,
	IOrderForm,
	IContactsForm,
} from '../types';
import { Model } from './base/Model';

export class AppState extends Model<IAppSateData> {
	protected products: IProductItem[];
	protected basket: IProductItem[];
	protected order: IOrder;

	setProduct(items: IProduct[]) {
		this.products = items.map((item) => ({
			...item,
			basketState: false,
		}));
	}

	getProducts(): IProductItem[] {
		return this.products;
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
			item.basketState === false;
		});
	}

	//переделать
	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
	}

	getOrder(): IOrder {
		return this.order;
	}
}
