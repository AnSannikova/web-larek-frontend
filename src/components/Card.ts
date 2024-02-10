import { ICardAction, ICardData } from '../types';
import { ensureElement, formatNumber } from '../utils/utils';
import { Component } from './base/Component';

export class Card extends Component<ICardData> {
	protected _category?: HTMLSpanElement;
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(container: HTMLElement, actions: ICardAction) {
		super(container);

		this._category = container.querySelector('.card__category');
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = container.querySelector('.card__image');
		this._description = container.querySelector('.card__text');
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = container.querySelector('.card__button');

		if (this._button) {
			this._button.addEventListener('click', actions.onClick);
		} else {
			this.container.addEventListener('click', actions.onClick);
		}
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
		this.setImage(this._image, value);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
			if (this._button) this.setHidden(this._button);
		} else {
			this.setText(this._price, formatNumber(value) + ' синапсов');
		}
	}

	set buttonLable(productState: boolean) {
		if (productState) {
			this.setText(this._button, 'Удалить из корзины');
		} else {
			this.setText(this._button, 'Купить');
		}
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
