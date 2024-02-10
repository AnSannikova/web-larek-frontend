import './scss/styles.scss';

import { ApiShop } from './components/ApiShop';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { AppState } from './components/AppSate';
import {
	IContactsForm,
	IOrderForm,
	IOrderResult,
	IProduct,
	IProductItem,
} from './types';
import { Modal } from './components/common/Modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card, CardBasket } from './components/Card';
import { Page } from './components/Page';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/Successs';

const events = new EventEmitter();
const api = new ApiShop(CDN_URL, API_URL);

const cardGalleryTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const pageElement = ensureElement<HTMLElement>('.page');
const modalElement = ensureElement<HTMLElement>('#modal-container');

const appState = new AppState({}, events);
const page = new Page(pageElement, events);
const modal = new Modal(modalElement, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

events.on('gallery:changed', () => {
	const cards = appState.getProducts().map((item) => {
		const card = new Card(cloneTemplate(cardGalleryTemplate), {
			onClick: () => {
				events.emit('card:select', item);
			},
		});

		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});

	page.counter = appState.getBasketItems().length;
	page.gallery = cards;
});

events.on('card:select', (item: IProductItem) => {
	appState.setPreviewCard(item);
});

events.on('preview:changed', (item: IProductItem) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (item.basketState) {
				appState.removeFromBasket(item);
			} else {
				appState.addToBasket(item);
			}

			modal.close();
			events.emit('basket:changed');
		},
	});

	modal.render({
		content: card.render({
			image: item.image,
			category: item.category,
			title: item.title,
			description: item.description,
			price: item.price,
			buttonLable: item.basketState,
		}),
	});
});

events.on('basket:changed', () => {
	const cards = appState.getBasketItems().map((item, index) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				appState.removeFromBasket(item);
				events.emit('basket:changed', item);
			},
		});

		return card.render({
			index: index + 1,
			title: item.title,
			price: item.price,
		});
	});

	basket.items = cards;
	basket.total = appState.getTotal();
	page.counter = appState.getBasketItems().length;
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			errors: [],
			valid: false,
		}),
	});
});

events.on(
	/^(order|contacts)\..*:change/,
	(data: { field: keyof (IContactsForm & IOrderForm); value: string }) => {
		appState.setOrderField(data.field, data.value);
	}
);

events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			errors: [],
			valid: false,
		}),
	});
});

events.on(
	'formErrors:change',
	(errors: Partial<IOrderForm & IContactsForm>) => {
		const { payment, address, email, phone } = errors;

		order.valid = !payment && !address;
		order.errors = Object.values({ payment, address })
			.filter((i) => !!i)
			.join('; ');

		contacts.valid = !email && !phone;
		contacts.errors = Object.values({ email, phone })
			.filter((i) => !!i)
			.join('; ');
	}
);

events.on('contacts:submit', () => {
	api
		.orderProduct(appState.getOrder())
		.then((result: IOrderResult) => {
			modal.render({
				content: success.render({
					description: result.total,
				}),
			});

			appState.clearBasket();
			page.counter = appState.getBasketItems().length;
			events.emit('basket:changed');
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

api
	.getItemList()
	.then((data: IProduct[]) => {
		appState.setProduct(data);
	})
	.catch((err) => {
		console.error(err);
	});
