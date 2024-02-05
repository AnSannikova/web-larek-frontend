import { ICardAction, IProduct } from '../types';
import { ensureElement, formatNumber } from '../utils/utils';
import { Component } from './base/Component';

export class Card extends Component<IProduct> {
	protected _id: string;
	protected _category?: HTMLSpanElement;
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ICardAction) {
		super(container);

		this._category = ensureElement<HTMLSpanElement>(
			'.card__category',
			container
		);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._description = ensureElement<HTMLElement>('.card__text', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);

		if (this._button) {
			if (this._price.textContent === 'Бесценно') {
				this.setHidden(this._button);
			}

			this._button.addEventListener('click', (event: MouseEvent) => {
				actions.onClick(event);
			});
		}
	}

	set id(value: string) {
		this._id = value;
	}

	set category(value: string) {
		this.setText(this._category, value);

		switch (value) {
			case 'софт-скил':
				this._category.classList.add('card__category_soft');
				break;

			case 'другое':
				this._category.classList.add('card__category_other');
				break;

			case 'хард-скил':
				this._category.classList.add('card__category_hard');
				break;

			case 'дополнительное':
				this._category.classList.add('card__category_additional');
				break;

			case 'кнопка':
				this._category.classList.add('card__category_button');
				break;
		}
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this._title.textContent);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
		}
		this.setText(this._price, formatNumber(value));
	}
}

export class CardBasket extends Card {
	protected _index: HTMLElement;

	constructor(container: HTMLElement, actions: ICardAction) {
		super(container, actions);

		this._index = ensureElement<HTMLSpanElement>(
			'.basket__item-index',
			container
		);
	}

	set index(value: number) {
		this.setText(this._index, value.toString());
	}
}
