import { IPageData } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Page extends Component<IPageData> {
  protected _counter: HTMLSpanElement;
  protected _buttonBasket: HTMLButtonElement;
  protected _gallery: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _locked: boolean;
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents) {
    super(container);

    this.events = events;
    this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', container);
    this._buttonBasket = ensureElement<HTMLButtonElement>('.header__basket', container);
    this._gallery = ensureElement<HTMLElement>('.gallery', container);
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);

    this._buttonBasket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  set counter(value:number) {
    this.setText(this._counter, value.toString());
  }

  set gallery(items: HTMLElement[]) {
    this._gallery.replaceChildren(...items);
  }

  set locked(value: boolean) {
    if (value === true) {
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._wrapper.classList.remove('page__wrapper_locked');
    }
  }
}