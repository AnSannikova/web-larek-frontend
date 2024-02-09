import { IBasketData } from '../types';
import { createElement, ensureElement, formatNumber } from '../utils/utils';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class Basket extends Component<IBasketData> {
	protected _basketList: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _total: HTMLSpanElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);

		this.events = events;
		this._basketList = ensureElement<HTMLElement>('.basket__list', container);
		this._button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			container
		);
		this._total = ensureElement<HTMLSpanElement>('.basket__price', container);

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._basketList.replaceChildren(...items);
			this.setDisabled(this._button, false);
		} else {
			this._basketList.replaceChildren(createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста'
			}));
			this.setDisabled(this._button, true);
		}
	}

	set total(value: number) {
		this.setText(this._total, formatNumber(value) + ' синапсов');
	}
}
