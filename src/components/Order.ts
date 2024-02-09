import { IOrderForm } from "../types";
import { ensureAllElements } from "../utils/utils";
import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export class Order extends Form<IOrderForm> {
  protected _buttonsPayment: HTMLButtonElement[];
  protected _address: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._address = container.elements.namedItem('address') as HTMLInputElement;
    this._buttonsPayment = ensureAllElements<HTMLButtonElement>('.button_alt', container);

    this._buttonsPayment.forEach((item) => {
      item.addEventListener('click', (evt) => { 
        this.selected(item.name);
        this.events.emit(`${this.form.name}.payment:change`, { field: 'payment', value: item.name });
      });
    })
  }

  set address(value: string) {
    this._address.value = value;
  }

  selected(name: string) {
    this._buttonsPayment.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === name);
    })
  }
}